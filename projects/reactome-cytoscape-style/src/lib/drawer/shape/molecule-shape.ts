import {extract} from "../../properties-utils";
import {DrawerProvider} from "../types";

export const molecule: DrawerProvider = (properties, width, height, drug) => {
  const select = extract(properties.global.selectNode);
  const hover = extract(properties.global.hoverNode);
  const thick = extract(properties.global.thickness);
  const stroke = !drug ?
    extract(properties.molecule.stroke) :
    extract(properties.molecule.drug);
  const fill = extract(properties.molecule.fill);

  const ht = thick / 2;
  const halfHeight = height / 2;
  const oR = halfHeight + thick;
  const iR = halfHeight - thick;
  const oRx = Math.min(oR, width / 2)
  return {
    hover: {
      "background-image": `
          <path fill="${hover}" stroke-linejoin="round" stroke-linecap="round"  d="
            M 0 ${oR}
            a ${oRx} ${oR} 0 0 1 ${oRx} -${oR}
            h ${width - 2 * oRx + thick}
            a ${oRx} ${oR} 0 0 1 ${oRx} ${oR}
            a ${oRx} ${iR} 0 0 0 -${oRx} -${iR}
            h -${width - 2 * oRx + thick}
            a ${oRx} ${iR} 0 0 0 -${oRx} ${iR}
            Z"/>
`,
      "background-position-y": -thick,
      "background-position-x": -thick / 2,
      "bounds-expansion": thick,
      "background-clip": "none",
      "background-image-containment": "over",
      "background-height": oR,
      "background-width": width + thick,
    },
    select: {
      "background-image": `
          <path fill="${select}" stroke-linejoin="round" stroke-linecap="round"  d="
            M 0 0
            a ${oRx} ${oR} 0 0 0 ${oRx} ${oR}
            h ${width - 2 * oRx + thick}
            a ${oRx} ${oR} 0 0 0 ${oRx} -${oR}
            a ${oRx} ${iR} 0 0 1 -${oRx} ${iR}
            h -${width - 2 * oRx + thick}
            a ${oRx} ${iR} 0 0 1 -${oRx} -${iR}
            Z"/>
`,
      "background-position-y": halfHeight,
      "background-position-x": -thick / 2,
      "bounds-expansion": thick,
      "background-clip": "none",
      "background-image-containment": "over",
      "background-height": oR,
      "background-width": width + thick,
    }
  }
}


