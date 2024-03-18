import {DrawerProvider} from "../types";
import {extract} from "../../properties-utils";


export const interactingPathway: DrawerProvider = (properties, {width, height, drug}) => {
  const select = extract(properties.global.selectNode);
  const hover = extract(properties.global.hoverNode);
  const flag = extract(properties.global.flag);
  const thick = extract(properties.global.thickness);


  const stroke = !drug ?
    extract(properties.pathway.stroke) :
    extract(properties.global.negativeContrast);
  const fill = extract(properties.pathway.fill);


  let realWidth = width;
  const t = 3 * thick;
  return {
    hover: {
      "background-image": `<rect fill="${hover}" width="${width}" height="${t}"/>`,
      "background-width": width,
      "background-height": t,
    },
    select: {
      "background-image": `<rect fill="${select}" width="${width}" height="${t}"/>`,
      "background-position-y": height - t,
      "background-width": width,
      "background-height": t,
    },
    flag: {
      "background-image": `
<rect fill="${flag}" width="${t}" height="${height}"/>
<rect fill="${flag}" width="${t}" height="${height}" x="${realWidth +t}"/>
`,
      "background-width": realWidth + 4 * t,
      "background-position-x": - t,
      "background-height": height,
      "bounds-expansion": 2 * t,
      "background-clip": "none",
      "background-image-containment": "over",
    },
  }
}

