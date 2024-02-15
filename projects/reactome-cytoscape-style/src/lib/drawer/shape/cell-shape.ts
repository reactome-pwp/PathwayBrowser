import {extract} from "../../properties-utils";
import {DrawerProvider} from "../types";

export const cell: DrawerProvider = (properties, {width, height}) => {
  const select = extract(properties.global.selectNode);
  const hover = extract(properties.global.hoverNode);
  const flag = extract(properties.global.flag);
  const thick = extract(properties.global.thickness);
  const cellThick = extract(properties.cell.thickness);
  const stroke = extract(properties.cell.stroke)
  const fill = extract(properties.cell.fill);

  const ht = thick / 2;
  const halfHeight = height / 2;
  const oR = halfHeight + thick;
  const iR = halfHeight - thick;
  const oRx = Math.min(oR, width / 2)
  return {
    background: {
      "background-image": `
<rect x="${ht}" y="${ht}" width="${width - thick}" height="${height - thick}" rx="${halfHeight}" stroke="${fill}" fill="${stroke}" stroke-width="${thick}"/>
<rect x="${ht + cellThick}" y="${2 * thick}" width="${width - 2 * cellThick - thick}" height="${height - 4 * thick}" ry="${halfHeight}" rx="${halfHeight - cellThick}" fill="${fill}" stroke-width="0"/>
`
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
            a ${oRx} ${oR} 0 0 0 ${oRx} ${oR}
            h ${width - 2 * oRx}
            a ${oRx} ${oR} 0 0 0 ${oRx} -${oR}
            a ${oRx} ${iR} 0 0 1 -${oRx} ${iR}
            h -${width - 2 * oRx}
            a ${oRx} ${iR} 0 0 1 -${oRx} -${iR}
            Z"/>
`,
      "background-position-y": halfHeight,
      "bounds-expansion": thick,
      "background-clip": "none",
      "background-image-containment": "over",
      "background-height": oR,
    },
    flag: {
      "background-image": `
<rect width="${width + 4 * thick}" height="${height + 2 * thick}" rx="${oR + 2 * thick}" ry="${oR}" fill="${flag}"/>
`,
      "background-position-x": -2 * thick,
      "background-position-y": -thick,
      "bounds-expansion": 2 * thick,
      "background-clip": "none",
      "background-image-containment": "over",
      "background-width": width + 4 * thick,
      "background-height": height + 2 * thick,
    }
  }
}


