import {memoize} from "lodash";
import {Reactome} from "../reactome-style";
import {extract} from "../type-utils";


/**
 * Curly braces shape
 *
 * @param width Total available width of shape
 * @param height Total available height of shape
 */
function shape(width: number, height: number): string {
  const t = extract(Reactome.Style.properties.global.thickness);
  const r = extract(Reactome.Style.properties.entitySet.radius);
  const fill = extract(Reactome.Style.properties.entitySet.fill);
  const stroke = extract(Reactome.Style.properties.entitySet.stroke);

  const r2 = r * 2;
  const doubleStroke = t * 2;
  const v = height / 2 - r2 - t; // Vertical
  return `
<defs>
  <path id="curly" d="
      M ${r2 + t} ${t}
      H ${width - r2 - t}
      q ${r} 0 ${r} ${r}

      v ${v}
      q 0 ${r} ${r} ${r}
      q -${r} 0 -${r} ${r}
      v ${v}

      q 0 ${r} -${r} ${r}
      H ${r2 + t}
      q -${r} 0 -${r} -${r}

      v -${v}
      q 0 -${r} -${r} -${r}
      q ${r} 0 ${r} -${r}
      v -${v}

      q 0 -${r} ${r} -${r}
      Z
      "/>
  <clipPath id="inside">
    <use href="#curly"/>
  </clipPath>
</defs>

<use href="#curly" fill="${fill}" stroke="${fill}" stroke-width="${doubleStroke}" stroke-linejoin="round"/>
<use href="#curly" fill="none" stroke="${stroke}" stroke-width="${doubleStroke}" clip-path="url(#inside)"/>
<rect fill="${fill}" x="${doubleStroke + r2}" y="0"
      width="${width - 2 * r2 - 2 * doubleStroke}"
      height="${height}"/>
`
}

export const entitySetsShape = memoize(shape)


