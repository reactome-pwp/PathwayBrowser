import cytoscape from "cytoscape";
import {Reactome} from "./reactome-style";
import {gene} from "./shape/gene-shape";
import _, {memoize} from "lodash";
import {molecule} from "./shape/molecule-shape";
import {protein} from "./shape/protein-shape";
import {rna} from "./shape/rna-shape";
import {genomeEncodedEntity} from "./shape/gee-shape";
import {complex} from "./shape/complex-shape";
import {entitySet} from "./shape/entity-sets-shape";
import {extract} from "./type-utils";
import PhysicalEntity = Reactome.PhysicalEntity;
import BackgroundImage = cytoscape.Css.BackgroundImage;
import PropertyValueNode = cytoscape.Css.PropertyValueNode;

function svg(svgStr: string, width = 100, height = 100) {
  const parser = new DOMParser();
  // const cleanedStr = svgStr.replaceAll(/  {2,}|\n/g, " "); // TODO examine performance impact
  let svgText =
    `<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE svg><svg xmlns='http://www.w3.org/2000/svg' version='1.1' width='${width}' height='${height}'>${svgStr}</svg>`;
  return parser.parseFromString(svgText, 'text/xml').documentElement;
};

export function svgStr(svgText: string, viewPortWidth: number, viewPortHeight: number) {
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg(svgText, viewPortWidth, viewPortHeight).outerHTML);
}

export type Image = {
  [k in keyof BackgroundImage]: BackgroundImage[k] extends PropertyValueNode<infer X> ? X : never
}

export interface Drawer {
  background?: Image;
  select?: Image;
  hover?: Image;
  flag?: Image;
  decorators?: Image[];
}

export interface DrawerProvider {
  (width: number, height: number, drug: boolean): Drawer
}


const dim = (width: number, height: number, drug: boolean) => `${width}x${height}-${drug}`;
export type Memo<T> = T & _.MemoizedFunction;
export const classToDrawers = new Map<Reactome.PhysicalEntity, Memo<DrawerProvider>>([
  ["Protein", memoize(protein, dim)],
  ["GenomeEncodedEntity", memoize(genomeEncodedEntity, dim)],
  ["RNA", memoize(rna, dim)],
  ["Gene", memoize(gene, dim)],
  ["Molecule", memoize(molecule, dim)],
  ["Complex", memoize(complex, dim)],
  ["EntitySet", memoize(entitySet, dim)],
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
  "background-image-containment": "over",
  "background-image-smoothing": "yes",
  "background-height-relative-to": "inner",
  "background-width-relative-to": "inner",
  "background-repeat": "no-repeat",
  "background-image-crossorigin": "anonymous",
  "bounds-expansion": 0
}

function aggregate<T extends Object, K extends keyof T>(toAggregate: T[], defaultValue: T): Aggregated<T> {
  const aggregate: Aggregated<T> = {} as Aggregated<T>;
  // const keys = new Set<K>(toAggregate.flatMap(t => Object.keys(t)) as K[]);
  //@ts-ignore
  const keys = new Set<K>(Object.keys(defaultValue));
  keys.forEach(key => aggregate[key] = toAggregate.map(t => t[key] || defaultValue[key]));
  return aggregate;
}

const RX = (width: number, height: number, clazz: Reactome.PhysicalEntity): Image => {
  const t = extract(Reactome.Style.properties.global.thickness);
  const color = clazz !== 'Molecule' ?
    extract(Reactome.Style.properties.global.onPrimary) :
    extract(Reactome.Style.properties.molecule.drug);

  const x = (clazz !== 'EntitySet' ? 0 : extract(Reactome.Style.properties.entitySet.radius)) + 3 * t;

  return {
    "background-image": `
      <path style="transform: scale(2)" fill="${color}" stroke-width="0.4" stroke="${color}" d="M3.2 4C3.3 4 3.4 4 3.6 4L6.75 8.81L5.7 10.15C5.7 10.15 5.53985 10.3884 5.31824 10.6092C5.00434 10.922 4.6582 11.3 4.28711 11.3C4.19141 11.3 4.2 11.3 4.1 11.3V11.5H6.4V11.3C6.2 11.3 6 11.3 5.9 11.2C5.8 11.1 5.8 11 5.8 10.9C5.8 10.6301 5.9 10.5547 6.16055 10.226L7 9.2L7.65291 10.226C7.82889 10.5025 8 10.7344 8 10.9C8 11.0656 7.90095 11.3 7.65291 11.3C7.55291 11.3 7.6 11.3 7.4 11.3V11.5H10.2V11.3C9.9 11.3 9.7 11.2 9.5 11C9.24121 10.7412 9 10.5 8.6 10L7.6 8.5L8.48711 7.35309C8.55228 7.28792 8.61656 7.21558 8.68081 7.13924C9.09787 6.6437 9.64859 6 10.2 6.01309V5.81309H7.8V6.01309C8 6.01309 8.2 6.01309 8.3 6.01309C8.45586 6.01309 8.6 6.20329 8.6 6.31309C8.6 6.62136 8.43963 6.81922 8.2462 7.03337L7.3 8.1L4.5 3.9C5.1 3.8 5.4 3.61 5.7 3.31C6 3.01 6.2 2.6 6.2 2.2C6.2 1.8 6.08711 1.47 5.78711 1.17C5.52798 0.910875 5.3 0.8 5 0.7C4.6 0.6 4.1 0.5 3.4 0.5H1V0.7H1.2C1.82201 0.7 2 1.14292 2 1.7V6C2 6.59634 2 6.9 1.2 6.9H1V7.1H3.8V6.9H3.6C2.9041 6.9 2.9 6.61047 2.9 6V4H3H3.2ZM3 3.7C3 3.7 3 3.7 2.9 3.7L2.88711 1C3.18711 0.9 3.4 0.9 3.6 0.9C4.47782 0.9 5 1.42405 5 2.3C5 3.40743 4.15401 3.7 3.2 3.7H3Z"/>
    `,
    "background-position-x": x,
    "background-position-y": (height / 2 - 11) + 'px',
    "background-width": "22px",
    "background-height": "24px",
  };
}


export const backgroundData = memoize((node: cytoscape.NodeSingular): Aggregated<Image> => {
  let layers: Image[] = [];
  const clazz = node.classes().find(clazz => classToDrawers.has(clazz as PhysicalEntity)) as PhysicalEntity
  if (!clazz) return aggregate(layers, defaultBg);

  const provider = classToDrawers.get(clazz)!;
  const [width, height, drug] = [node.data("width"), node.data("height"), node.hasClass('drug')];
  const drawer = provider(width, height, drug);

  if (drawer.background) layers.push(drawer.background);

  if (node.selected() && drawer.select) layers.push(drawer.select);

  if (node.hasClass('hover') && drawer.hover) layers.push(drawer.hover);

  if (node.hasClass('flag') && drawer.flag) layers.push(drawer.flag);

  if (drawer.decorators) layers.push(...drawer.decorators);

  if (drug) {
    layers.push(RX(width, height, clazz));
  }


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
