import {extract} from "../../properties-utils";
import {DrawerProvider} from "../types";

export const protein: DrawerProvider = (properties, width, height, drug) => {
  const select = extract(properties.global.selectNode);
  const hover = extract(properties.global.hoverNode);
  const thick = extract(properties.global.thickness);
  const radius = extract(properties.protein.radius);

  const oR = radius + thick;
  const iR = radius - thick;

  return {
    hover: {
      "background-image": `
          <path fill="${hover}" stroke-linejoin="round" stroke-linecap="round"  d="
            M 0 ${oR}
            a ${oR} ${oR} 0 0 1 ${oR} -${oR}
            h ${width - 2 * oR}
            a ${oR} ${oR} 0 0 1 ${oR} ${oR}
            a ${oR} ${iR} 0 0 0 -${oR} -${iR}
            h -${width - 2 * oR}
            a ${oR} ${iR} 0 0 0 -${oR} ${iR}
            Z"/>
`,
      "background-position-y": -thick,
      "bounds-expansion": thick,
      "background-clip": "none",
      "background-image-containment": "over",
      "background-height": oR,
    },
    select: {
      "background-image": `
          <path fill="${select}" stroke-linejoin="round" stroke-linecap="round"  d="
            M 0 0
            a ${oR} ${oR} 0 0 0 ${oR} ${oR}
            h ${width - 2 * oR}
            a ${oR} ${oR} 0 0 0 ${oR} -${oR}
            a ${oR} ${iR} 0 0 1 -${oR} ${iR}
            h -${width - 2 * oR}
            a ${oR} ${iR} 0 0 1 -${oR} -${iR}
            Z"/>
`,
      "background-position-y": height - radius,
      "bounds-expansion": thick,
      "background-clip": "none",
      "background-image-containment": "over",
      "background-height": oR,
    }
  }
}


