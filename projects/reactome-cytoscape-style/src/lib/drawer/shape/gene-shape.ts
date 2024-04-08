import {extract} from "../../properties-utils";
import {DrawerProvider} from "../types";


export const gene: DrawerProvider = (properties, {width, height, drug, interactor, disease, lossOfFunction}) => {
  const t = extract(properties.global.thickness);
  const dHeight = extract(properties.gene.decorationHeight);
  const dWidth = extract(properties.gene.decorationExtraWidth);
  const headSize = extract(properties.gene.arrowHeadSize);
  const radius = extract(properties.gene.arrowRadius);
  const fill = extract(properties.gene.fill);
  const stroke = interactor ? extract(properties.interactor.fill) : disease ? extract(properties.global.negativeContrast) : null;
  const select = extract(properties.global.selectNode);
  const hover = extract(properties.global.hoverNode);
  const flag = extract(properties.global.flag);
  const hh = Math.sqrt(Math.pow(headSize, 2) * 3 / 4)

  const halfWidth = width / 2;

  const r = extract(properties.gene.borderRadius);
  const oR = r + t;
  const iR = r - t;
  const t_2 = t / 2;
  const t2 = t * 2;
  return {
    background: {
      "background-image": `
          <path fill="${fill}" stroke-linecap="round" transform="translate(${t_2} ${t_2})"
      ${stroke ? `stroke="${stroke}" stroke-width="${t}"` : ''}
      ${lossOfFunction ? `stroke-dasharray="${t} ${t2}"` : ''}  d="
            M ${0} ${dHeight}
            H ${width}
            v ${height - dHeight - radius}
            a ${radius} ${radius} 0 0 1 -${radius} ${radius}
            H ${radius}
            a ${radius} ${radius} 0 0 1 -${radius} -${radius}
            Z
          "/>`,
      "bounds-expansion": t_2,
      "background-clip": "none",
      "background-image-containment": "over",
      "background-position-x": -t / 2,
      "background-position-y": -t / 2,
      "background-width": width + t,
      "background-height": height + t,

    },
    decorators: [
      {
        "background-image": `
          <path fill="none" stroke="${fill}" stroke-width="${t}"  d="
            M ${halfWidth} ${dHeight + 2 * t}
            v -${dHeight - radius - (headSize + t) / 2 + 2 * t}
            a ${radius} ${radius} 0 0 1 ${radius} -${radius}
            h ${halfWidth - t - radius + dWidth}
          "/>
            <path fill="${fill}" stroke="${fill}" stroke-width="${t}" stroke-linejoin="round"  d="
            M ${width - hh - t_2 + dWidth} ${headSize / 2 + t_2}
            v -${headSize / 2}
            l ${hh} ${headSize / 2}
            l -${hh} ${headSize / 2}
            v -${headSize / 2}
            z
          "/>`,
        "background-position-y": -t / 2,
        "bounds-expansion": dHeight,
        "background-height": dHeight + 1.5 * t,
        "background-width": width + dWidth,
        "background-clip": "none",
        "background-image-containment": "over",
      }
    ],
    hover: {
      "background-image": `<rect x="0" y="0" width="${width}" height="${2 * t}" fill="${hover}"/>`,
      "background-position-y": dHeight - t,
      "bounds-expansion": t,
      "background-clip": "none",
      "background-image-containment": "over",
      "background-height": 2 * t,
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
      "bounds-expansion": t,
      "background-clip": "none",
      "background-image-containment": "over",
      "background-height": oR,
    },
    flag: {
      "background-image": `
       <path fill="${flag}" d="
       M 0 0
       H ${width + 4 * t}
       V ${height - dHeight - r + t}
       a ${oR + t} ${oR} 0 0 1 -${oR + t} ${oR}
       H ${oR + t}
       a ${oR + t} ${oR} 0 0 1 -${oR + t} -${oR}
       Z
       "/>
`,
      "background-position-x": -2 * t,
      "background-position-y": dHeight - t,
      "bounds-expansion": 2 * t,
      "background-clip": "none",
      "background-image-containment": "over",
      "background-width": width + 4 * t,
      "background-height": height + 2 * t - dHeight,
    }
  }
}


