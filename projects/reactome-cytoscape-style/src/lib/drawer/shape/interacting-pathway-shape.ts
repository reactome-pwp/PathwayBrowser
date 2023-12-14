import {DrawerProvider} from "../types";
import {extract} from "../../properties-utils";
import {Style} from "../../style";


export const interactingPathway: DrawerProvider = (width, height, drug) => {
  const select = extract(Style.properties.global.select);
  const hover = extract(Style.properties.global.hover);
  const thick = extract(Style.properties.global.thickness);


  const stroke = !drug ?
    extract(Style.properties.pathway.stroke) :
    extract(Style.properties.pathway.disease);
  const fill = extract(Style.properties.pathway.fill);


  let realWidth = width + 3 * thick;
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
      "background-position-x": -t / 2,
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
      "background-position-x": -t / 2,
      "background-width": realWidth,
      "bounds-expansion": t,
      "background-clip": "none",
      "background-image-containment": "over",
    }
  }
}

