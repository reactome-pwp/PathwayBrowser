import {DrawerProvider} from "../types";
import {extract} from "../../properties-utils";


export const interactingPathway: DrawerProvider = (properties, {width, height, drug}) => {
  const select = extract(properties.global.selectNode);
  const hover = extract(properties.global.hoverNode);
  const thick = extract(properties.global.thickness);


  const stroke = !drug ?
    extract(properties.pathway.stroke) :
    extract(properties.pathway.disease);
  const fill = extract(properties.pathway.fill);


  let realWidth = width;
  const t = 3 * thick;
  return {

    hover: {
      "background-image": `
          <path fill="${hover}" stroke-linejoin="round" stroke-linecap="round"  d="
           M 0 0
           H ${realWidth}
           V ${t}
           H 0
           V 0
           Z
           "/>
`,
      "background-position-y": -t / 2,
      "background-position-x": 0,
      "background-width": realWidth,
      "bounds-expansion": t,
      "background-clip": "none",
      "background-image-containment": "over",
    },
    select: {
      "background-image": `
          <path fill="${select}" stroke-linejoin="round" stroke-linecap="round"  d="
           M 0 0
           H ${realWidth}
           V ${t}
           H 0
           V 0
           Z"/>
`,
      "background-position-y": height - t / 2,
      "background-position-x": 0,
      "background-width": realWidth,
      "bounds-expansion": t,
      "background-clip": "none",
      "background-image-containment": "over",
    }
  }
}

