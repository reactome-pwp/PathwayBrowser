import {Reactome} from "../reactome-style";
import {extract} from "../type-utils";
import {DrawerProvider} from "../svg-utils";

export const molecule: DrawerProvider = (width, height, disease) => {
  const select = extract(Reactome.Style.properties.global.select);
  const hover = extract(Reactome.Style.properties.global.hover);
  const thick = extract(Reactome.Style.properties.global.thickness);
  const stroke = !disease ?
    extract(Reactome.Style.properties.molecule.stroke) :
    extract(Reactome.Style.properties.molecule.disease);
  const fill = extract(Reactome.Style.properties.molecule.fill);

  const ht = thick / 2;
  const halfHeight = height / 2;
  const oR = halfHeight + thick;
  const iR = halfHeight - thick;

  return {
    background: {
      "background-image": `<rect x="${ht}" y="${ht}" width="${width - thick}" height="${height - thick}" rx="${halfHeight}" stroke="${stroke}" fill="${fill}" stroke-width="${thick}"/>`
    },
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
      "background-position-y": halfHeight,
      "bounds-expansion": thick,
      "background-clip": "none",
      "background-image-containment": "over",
      "background-height": oR,
    }
  }
}


