import {extract} from "../../properties-utils";
import {DrawerProvider} from "../types";


export const gene: DrawerProvider = (properties, width, height, drug, disease, interactor) => {
  const thick = extract(properties.global.thickness);
  const dHeight = extract(properties.gene.decorationHeight);
  const dWidth = extract(properties.gene.decorationExtraWidth);
  const headSize = extract(properties.gene.arrowHeadSize);
  const radius = extract(properties.gene.arrowRadius);
  const fill = interactor ? extract(properties.interactor.fill) : extract(properties.gene.fill);
  const select = extract(properties.global.selectNode);
  const hover = extract(properties.global.hoverNode);
  const hh = Math.sqrt(Math.pow(headSize, 2) * 3 / 4)

  const halfWidth = width / 2;

  const r = extract(properties.gene.borderRadius);
  const oR = r + thick;
  const iR = r - thick;
  return {
    background: {
      "background-image": `
          <path fill="${fill}" stroke-width="0" stroke-linejoin="round" stroke-linecap="round"  d="
            M ${0} ${dHeight}
            H ${width}
            v ${height - dHeight - radius}
            a ${radius} ${radius} 0 0 1 -${radius} ${radius}
            H ${radius}
            a ${radius} ${radius} 0 0 1 -${radius} -${radius}
            Z
          "/>`,
      "background-position-y": 0,
      "background-position-x": 0,

    },
    decorators: [
      {
        "background-image": `
          <path fill="none" stroke="${fill}" stroke-width="${thick}"  d="
            M ${halfWidth} ${dHeight + 2 * thick}
            v -${dHeight - radius - (headSize + thick) / 2 + 2 * thick}
            a ${radius} ${radius} 0 0 1 ${radius} -${radius}
            h ${halfWidth - thick - radius + dWidth}
          "/>
            <path fill="${fill}" stroke="${fill}" stroke-width="${thick}" stroke-linejoin="round"  d="
            M ${width - hh - thick / 2 + dWidth} ${headSize / 2 + thick / 2}
            v -${headSize / 2}
            l ${hh} ${headSize / 2}
            l -${hh} ${headSize / 2}
            v -${headSize / 2}
            z
          "/>`,
        "background-position-y": -thick / 2,
        "bounds-expansion": dHeight,
        "background-height": dHeight + 1.5 * thick,
        "background-width": width + dWidth,
        "background-clip": "none",
        "background-image-containment": "over",
      }
    ],
    hover: {
      "background-image": `<rect x="0" y="0" width="${width}" height="${2 * thick}" fill="${hover}"/>`,
      "background-position-y": dHeight - thick,
      "bounds-expansion": thick,
      "background-clip": "none",
      "background-image-containment": "over",
      "background-height": 2 * thick,
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
      "background-position-y": height - r,
      "bounds-expansion": thick,
      "background-clip": "none",
      "background-image-containment": "over",
      "background-height": oR,
    }
  }
}


