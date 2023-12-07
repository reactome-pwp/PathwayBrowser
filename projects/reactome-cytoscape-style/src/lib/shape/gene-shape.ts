import {Reactome} from "../reactome-style";
import {extract} from "../type-utils";
import {DrawerProvider} from "../svg-utils";


export const gene: DrawerProvider = (width, height, drug) => {
  const thick = extract(Reactome.Style.properties.global.thickness);
  const dHeight = extract(Reactome.Style.properties.gene.decorationHeight);
  const headSize = extract(Reactome.Style.properties.gene.arrowHeadSize);
  const radius = extract(Reactome.Style.properties.gene.arrowRadius);
  const fill = extract(Reactome.Style.properties.gene.fill);
  const select = extract(Reactome.Style.properties.global.select);
  const hover = extract(Reactome.Style.properties.global.hover);
  const hh = Math.sqrt(Math.pow(headSize, 2) * 3 / 4)

  const halfWidth = width / 2;

  const r = extract(Reactome.Style.properties.gene.borderRadius);
  const oR = r + thick;
  const iR = r - thick;
  return {
    decorators: [
      {
        "background-image": `
          <path fill="none" stroke="${fill}" stroke-width="${thick}" stroke-linejoin="round" stroke-linecap="round"  d="
            M ${halfWidth} ${dHeight + thick}
            v -${dHeight - radius - (headSize + thick) / 2 + thick}
            a ${radius} ${radius} 0 0 1 ${radius} -${radius}
            h ${halfWidth - thick - radius}
          "/>
            <path fill="${fill}" stroke="${fill}" stroke-width="${thick}" stroke-linejoin="round"  d="
            M ${width - hh - thick / 2} ${headSize / 2 + thick / 2}
            v -${headSize / 2}
            l ${hh} ${headSize / 2}
            l -${hh} ${headSize / 2}
            v -${headSize / 2}
            z
          "/>`,
        "background-position-y": -dHeight,
        "bounds-expansion": dHeight,
        "background-height": dHeight + thick,
        "background-clip": "none",
        "background-image-containment": "over",
      }
    ],
    hover: {
      "background-image": `<rect x="0" y="0" width="${width}" height="${2*thick}" fill="${hover}"/>`,
      "background-position-y": -thick,
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


