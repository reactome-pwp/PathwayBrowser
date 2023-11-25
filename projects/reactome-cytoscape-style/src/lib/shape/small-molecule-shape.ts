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
  const stroke = extract(Reactome.Style.properties.molecule.stroke);
  const fill = extract(Reactome.Style.properties.molecule.fill);
  const ht = thick / 2;

  return `<rect x="${ht}" y="${ht}" width="${width - thick}" height="${height - thick}" rx="${height / 2}" stroke="${stroke}" fill="${fill}" stroke-width="${thick}"/>`
}

export const moleculeShape = memoize(shape, (width, height)=> `${width}x${height}`)


