import {memoize} from "lodash";
import { Reactome} from "../reactome-style";
import {extract} from "../type-utils";


// TODO Fix bug where sometimes the svg onlytakes hald of its allowed height
/**
 * Rectangle with cut corners shape
 *
 * @param width Total available width of shape
 * @param height Total available height of shape
 */
function shape(width: number, height: number): string {
  const t = extract(Reactome.Style.properties.global.thickness);
  const cut = extract(Reactome.Style.properties.complex.cut);
  const fill = extract(Reactome.Style.properties.complex.fill);
  const stroke = extract(Reactome.Style.properties.complex.stroke);

  const cut2 = cut * 2;
  const t2 = t * 2;
  const v = height - cut2 - 2 * t2; // Vertical
  return `
<defs>
  <path id="octogon" d="
      M ${cut2 + t2} ${t2}
      H ${width - cut - t2}
      l ${cut} ${cut}
      v ${v}
      l  -${cut} ${cut}
      H ${cut2 + t2}
      l -${cut} 0 -${cut} -${cut}
      v -${v}
      l  ${cut} -${cut}
      Z
      "/>
</defs>

<use href="#octogon" fill="${fill}" stroke="${fill}" stroke-width="${2 * t2}" stroke-linejoin="round"/>
<use href="#octogon" fill="none" stroke="${stroke}" stroke-width="${t2}" stroke-linejoin="round"/>
<use href="#octogon" fill="${fill}"/>
`
}

export const complexShape = memoize(shape, (width, height)=> `${width}x${height}` )


