import cytoscape from "cytoscape";
import {Reactome} from "./reactome-style";
import {gene} from "./shape/gene-shape";
import _, {memoize} from "lodash";
import PhysicalEntity = Reactome.PhysicalEntity;
import BackgroundImage = cytoscape.Css.BackgroundImage;
import PropertyValueNode = cytoscape.Css.PropertyValueNode;

function svg(svgStr: string, width = 100, height = 100) {
  const parser = new DOMParser();
  const cleanedStr = svgStr.replaceAll(/  {2,}|\n/g, " "); // TODO examine performance impact
  let svgText =
    `<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE svg><svg xmlns='http://www.w3.org/2000/svg' version='1.1' width='${width}' height='${height}'>${cleanedStr}</svg>`;
  return parser.parseFromString(svgText, 'text/xml').documentElement;
};

export function svgStr(svgText: string, viewPortWidth: number, viewPortHeight: number) {
  let s = svg(svgText, viewPortWidth, viewPortHeight);
  // if (s.getRootNode().nodeName !== 'svg') console.log(s)
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(s.outerHTML);
}

export type Image = {
  [k in keyof BackgroundImage]: BackgroundImage[k] extends PropertyValueNode<infer X> ? X : never
}

export interface Drawer {
  background?: Image;
  select?: Image;
  hover?: Image;
  decorators?: Image[];
  flag?: Image;
}

export interface DrawerProvider {
  (width: number, height: number, disease: boolean): Drawer
}


const dim = (width: number, height: number) => `${width}x${height}`;
export type Memo<T> = T & _.MemoizedFunction;
export const classToDrawers = new Map<Reactome.PhysicalEntity, Memo<DrawerProvider>>([
  // ["Protein", ],
  // ["GenomeEncodedEntity", {background: undefined}],
  // ["RNA", {background: undefined}],
  ["Gene", memoize(gene, dim)],
  // ["Molecule", {background: moleculeShape}],
  // ["Complex", {background: complexShape}],
  // ["EntitySet", {background: entitySetsShape}],
]);

type Aggregated<T> = {
  [k in keyof T]: T[k][]
}

const defaultBg: Image = {
  "background-image": "",
  "background-position-x": "0",
  "background-position-y": "0",
  "background-offset-x": "0",
  "background-offset-y": "0",
  "background-width": "100%",
  "background-height": "100%",
  "background-fit": "none",
  "background-clip": "none",
  "background-image-containment": "inside",
  "background-image-smoothing": "yes",
  "background-height-relative-to": "inner",
  "background-width-relative-to": "inner",
  "background-repeat": "no-repeat",
  "background-image-crossorigin": "anonymous",
  "bounds-expansion": 0
}

function aggregate<T extends Object, K extends keyof T>(toAggregate: T[], defaultValue: T): Aggregated<T> {
  const aggregate: Aggregated<T> = {} as Aggregated<T>;
  const keys = new Set<K>(toAggregate.flatMap(t => Object.keys(t)) as K[]);
  // @ts-ignore
  keys.forEach(key => aggregate[key] = toAggregate.map(t => t[key] || defaultValue[key]));
  return aggregate;
}

const RX = (width: number, height: number): Image => ({
  "background-image": "assets/Rx.svg",
  "background-position-x": "4px",
  "background-position-y": (height / 2 - 6) + 'px',
  "background-width": "11px",
  "background-height": "12px",
})


export const backgroundData = memoize((node: cytoscape.NodeSingular): Aggregated<Image> => {
  console.log("backgroundData() called", node.id() + '-' + node.classes().toString() + '-s:' + node.selected())
  let layers: Image[] = [];
  const clazz = node.classes().find(clazz => classToDrawers.has(clazz as PhysicalEntity)) as PhysicalEntity
  if (!clazz) return aggregate(layers, defaultBg);

  const provider = classToDrawers.get(clazz)!;
  const [width, height, disease] = [node.data("width"), node.data("height"), node.hasClass('disease')];
  const drawer = provider(width, height, disease);

  if (drawer.background) layers.push(drawer.background);

  if (node.selected() && drawer.select) layers.push(drawer.select);

  if (disease) layers.push(RX(width, height));

  if (node.hasClass('hover') && drawer.hover) layers.push(drawer.hover);

  if (node.hasClass('flag') && drawer.flag) layers.push(drawer.flag);

  if (drawer.decorators) layers.push(...drawer.decorators);

  // Convert raw HTML to string encoded images
  layers = layers.map(l => ({
      ...l,
      "background-image": svgStr(l["background-image"] as string,
        l["background-width"] || width,
        l["background-height"] || height
      )
    })
  );

  return aggregate(layers, defaultBg);
}, node => node.id() + '-' + node.classes().toString() + '-s:' + node.selected())
