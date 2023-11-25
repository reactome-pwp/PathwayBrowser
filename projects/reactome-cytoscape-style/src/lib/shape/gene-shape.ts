import {memoize} from "lodash";
import { Reactome} from "../reactome-style";
import {extract} from "../type-utils";

/**
 * Rectangle with cut corners shape
 *
 * @param width Total available width of shape
 * @param height Total available height of shape
 */
function shape(width: number, height: number): string {
  const thick = extract(Reactome.Style.properties.global.thickness);
  const dHeight = extract(Reactome.Style.properties.gene.decorationHeight);
  const radius = extract(Reactome.Style.properties.gene.radius);
  const headSize = extract(Reactome.Style.properties.gene.arrowHeadSize);
  const fill = extract(Reactome.Style.properties.gene.fill);

  const hh = Math.sqrt(Math.pow(headSize, 2) * 3 / 4)
  const halfWidth = width / 2;
  return `
  <path fill="none" stroke="${fill}" stroke-width="${thick}" stroke-linejoin="round" stroke-linecap="round"  d="
    M ${halfWidth} ${dHeight}
    v -${dHeight - radius - (headSize + thick) / 2}
    q 0 -${radius} ${radius} -${radius}
    h ${halfWidth - thick - radius}
  "/>
    <path fill="${fill}" stroke="${fill}" stroke-width="${thick}" stroke-linejoin="round"  d="
    M ${width - hh - thick / 2} ${headSize / 2 + thick/2}
    v -${headSize / 2}
    l ${hh} ${headSize / 2}
    l -${hh} ${headSize / 2}
    v -${headSize / 2}
    z
  "/>
  `
}

export const geneShape = memoize(shape)


