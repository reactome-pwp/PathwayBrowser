import {extract} from "../../properties-utils";
import {DrawerProvider} from "../types";

export const genomeEncodedEntity: DrawerProvider = (properties, width, height, drug) => {
  const fill = !drug ?
    extract(properties.genomeEncodedEntity.fill) :
    extract(properties.genomeEncodedEntity.drug);
  const select = extract(properties.global.selectNode);
  const hover = extract(properties.global.hoverNode);
  const t = extract(properties.global.thickness);
  const bottomR = extract(properties.genomeEncodedEntity.bottomRadius);

  const topR = Math.min(extract(properties.genomeEncodedEntity.topRadius), height - bottomR);
  const v = height - bottomR - topR;

  const topOR = topR + t;
  const topIR = topR - t;

  const bottomOR = bottomR + t;
  const bottomIR = bottomR - t;


  return {
    background: {
      "background-image": `
      <path fill="${fill}" d="
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
      `
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
    }
  }
}


