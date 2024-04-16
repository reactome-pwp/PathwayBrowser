import {extract} from "../../properties-utils";
import {DrawerProvider} from "../types";

export const genomeEncodedEntity: DrawerProvider = (properties, {
  width,
  height,
  drug,
  disease,
  interactor,
  lossOfFunction
}) => {
  const fill = !drug ?
    extract(properties.complex.fill) :
    extract(properties.genomeEncodedEntity.drug);
  const select = extract(properties.global.selectNode);
  const hover = extract(properties.global.hoverNode);
  const flag = extract(properties.global.flag);
  const t = extract(properties.global.thickness);
  const t_2 = t / 2;
  const bottomR = extract(properties.genomeEncodedEntity.bottomRadius);
  const stroke = !interactor ? !disease ? null : extract(properties.global.negativeContrast) : extract(properties.interactor.fill);

  const topR = Math.min(extract(properties.genomeEncodedEntity.topRadius), height - bottomR, width / 2 - t);
  const v = height - bottomR - topR;

  const topOR = topR + t;
  const topIR = topR - t;

  const bottomOR = bottomR + t;
  const bottomIR = bottomR - t;


  return {
    background: {
      "background-image": `
      <path fill="${fill}" stroke-linecap="round" transform="translate(${t_2} ${t_2})"
      ${stroke ? `stroke="${stroke}" stroke-width="${t}"` : ''}
      ${lossOfFunction ? `stroke-dasharray="${t} ${t * 2}"` : ''}
      d="
      M ${topR} 0
      H ${width - topR}
      a ${topR} ${topR} 0 0 1 ${topR} ${topR}
      v ${v}
      a ${bottomR} ${bottomR} 0 0 1 -${bottomR} ${bottomR}
      H ${bottomR}
      a ${bottomR} ${bottomR} 0 0 1 -${bottomR} -${bottomR}
      v -${v}
      a ${topR} ${topR} 0 0 1 ${topR} -${topR}
      Z
      "/>
      `,
      "bounds-expansion": t / 2,
      "background-clip": "none",
      "background-image-containment": "over",
      "background-position-x": -t_2,
      "background-position-y": -t_2,
      "background-width": width + t,
      "background-height": height + t,
    },
    hover: {
      "background-image": `
          <path fill="${hover}" stroke-linejoin="round" stroke-linecap="round"  d="
            M 0 ${topOR}
            a ${topOR} ${topOR} 0 0 1 ${topOR} -${topOR}
            h ${width - 2 * topOR}
            a ${topOR} ${topOR} 0 0 1 ${topOR} ${topOR}
            a ${topOR} ${topIR} 0 0 0 -${topOR} -${topIR}
            h -${width - 2 * topOR}
            a ${topOR} ${topIR} 0 0 0 -${topOR} ${topIR}
            Z"/>
`,
      "background-position-y": -t,
      "bounds-expansion": t,
      "background-clip": "none",
      "background-image-containment": "over",
      "background-height": topOR,
    },
    select: {
      "background-image": `
          <path fill="${select}" stroke-linejoin="round" stroke-linecap="round"  d="
            M 0 0
            a ${bottomOR} ${bottomOR} 0 0 0 ${bottomOR} ${bottomOR}
            h ${width - 2 * bottomOR}
            a ${bottomOR} ${bottomOR} 0 0 0 ${bottomOR} -${bottomOR}
            a ${bottomOR} ${bottomIR} 0 0 1 -${bottomOR} ${bottomIR}
            h -${width - 2 * bottomOR}
            a ${bottomOR} ${bottomIR} 0 0 1 -${bottomOR} -${bottomIR}
            Z"/>
`,
      "background-position-y": height - bottomR,
      "bounds-expansion": t,
      "background-clip": "none",
      "background-image-containment": "over",
      "background-height": bottomOR,
    },
    flag: {
      "background-image": `
      <path fill="${flag}" d="
      M ${topOR} 0
      H ${width + 3 * t - topOR}
      a ${topOR + t} ${topOR} 0 0 1 ${topOR + t} ${topOR}
      v ${v}
      a ${bottomOR + t} ${bottomOR} 0 0 1 -${bottomOR + t} ${bottomOR}
      H ${bottomOR + t}
      a ${bottomOR + t} ${bottomOR} 0 0 1 -${bottomOR + t} -${bottomOR}
      v -${v}
      a ${topOR + t} ${topOR} 0 0 1 ${topOR + t} -${topOR}
      Z
      "/>
`,
      "background-position-x": -2 * t,
      "background-position-y": -t,
      "bounds-expansion": 2 * t,
      "background-clip": "none",
      "background-image-containment": "over",
      "background-width": width + 4 * t,
      "background-height": height + 2 * t,
    }
  }
}


