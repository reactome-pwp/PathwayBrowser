import {Style} from "../../style";
import {extract} from "../../properties-utils";
import {DrawerProvider} from "../types";

export const sub: DrawerProvider = (width, height, disease) => {
  const select = extract(Style.properties.global.selectNode);
  const hover = extract(Style.properties.global.hoverNode);
  const thick = extract(Style.properties.global.thickness ) * 3;
  const stroke = !disease ?
    extract(Style.properties.pathway.stroke) :
    extract(Style.properties.pathway.disease);
  const fill = extract(Style.properties.pathway.fill);

  const ht = thick / 2;
  const halfHeight = height / 2;
  const oR = halfHeight;
  const iR = halfHeight - thick;
  const oRx = Math.min(oR, width / 2)
  return {
    background: {
      "background-image": `<rect x="${ht}" y="${ht}" width="${width - thick}" height="${height - thick}" rx="${halfHeight}" stroke="${stroke}" fill="${fill}" stroke-width="${thick}"/>`
    },
    hover: {
      "background-image": `
          <path fill="${hover}" stroke-linejoin="round" stroke-linecap="round"  d="
            M 0 ${oR}
            a ${oRx} ${oR} 0 0 1 ${oRx} -${oR}
            h ${width - 2 * oRx}
            a ${oRx} ${oR} 0 0 1 ${oRx} ${oR}
            a ${oRx} ${iR} 0 0 0 -${oRx} -${iR}
            h -${width - 2 * oRx}
            a ${oRx} ${iR} 0 0 0 -${oRx} ${iR}
            Z"/>
`,
      "background-clip": "none",
      "background-image-containment": "over",
      "background-height": oR,
    },
    select: {
      "background-image": `
          <path fill="${select}" stroke-linejoin="round" stroke-linecap="round"  d="
            M 0 0
            a ${oRx} ${oR} 0 0 0 ${oRx} ${oR}
            h ${width - 2 * oRx}
            a ${oRx} ${oR} 0 0 0 ${oRx} -${oR}
            a ${oRx} ${iR} 0 0 1 -${oRx} ${iR}
            h -${width - 2 * oRx}
            a ${oRx} ${iR} 0 0 1 -${oRx} -${iR}
            Z"/>
`,
      "background-position-y": halfHeight,
      "background-clip": "none",
      "background-image-containment": "over",
      "background-height": oR,
    }
  }
}


