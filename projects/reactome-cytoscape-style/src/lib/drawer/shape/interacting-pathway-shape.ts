import {DrawerProvider} from "../types";
import {extract} from "../../properties-utils";


export const interactingPathway: DrawerProvider = (properties, {width, height, drug, gradient}) => {
  const select = extract(properties.global.selectNode);
  const hover = extract(properties.global.hoverNode);
  const flag = extract(properties.global.flag);
  const thick = extract(properties.global.thickness);

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
<rect fill="${flag}" width="${t}" height="${height}" x="${realWidth + t}"/>
`,
      "background-width": realWidth + 4 * t,
      "background-position-x": -t,
      "background-height": height,
      "bounds-expansion": 2 * t,
      "background-clip": "none",
      "background-image-containment": "over",
    },
    analysis: {
      "background-image": `${gradient}<rect fill="url(#gradient)" x="${t}" y="${t}" width="${width - 2 * t}" height="${height - 2 * t}"/>`
    }
  }
}

