import {Style} from "../../style";
import {extract} from "../../properties-utils";
import {DrawerProvider} from "../types";


export const rna: DrawerProvider = (width, height, drug) => {
  const thick = extract(Style.properties.global.thickness);
  const select = extract(Style.properties.global.selectNode);
  const hover = extract(Style.properties.global.hoverNode);

  const halfWidth = width / 2;

  const r = extract(Style.properties.rna.radius);
  const oR = r + thick;
  const iR = r - thick;
  return {
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


