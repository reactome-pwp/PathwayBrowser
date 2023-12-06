import {Reactome} from "../reactome-style";
import {extract} from "../type-utils";
import {DrawerProvider} from "../svg-utils";


export const complex: DrawerProvider = (width, height) => {
  const select = extract(Reactome.Style.properties.global.select);
  const hover = extract(Reactome.Style.properties.global.hover);

  const t = extract(Reactome.Style.properties.global.thickness);
  const cut = extract(Reactome.Style.properties.complex.cut);
  const fill = extract(Reactome.Style.properties.complex.fill);
  const stroke = extract(Reactome.Style.properties.complex.stroke);

  const cut2 = cut * 2;
  const t2 = t * 2;
  const v = height - cut2 - 2 * t2; // Vertical

  const delta = 0.05;
  const stateHeight = height / 2 + t;

  const defs = `<defs>
  <path id="octogon" d="
      M ${cut2 + t2 + delta} ${t2}
      H ${width - cut - t2 - delta}
      l ${cut} ${cut}
      v ${v}
      l  -${cut} ${cut}
      H ${cut2 + t2 + delta}
      l -${cut} 0 -${cut} -${cut}
      v -${v}
      l  ${cut} -${cut}
      Z
      "/>
  </defs>`;
  return {
    background: {
      "background-image": `
${defs}
<use href="#octogon" fill="${fill}" stroke="${fill}" stroke-width="${2 * t2}" stroke-linejoin="round"/>
`
    },
    hover: {
      "background-image": `
      <path stroke="${hover}" stroke-width="${2 * t2}" stroke-linejoin="round" d="
      M ${t2} ${stateHeight}
      v -${v/2}
      l ${cut} -${cut + t}
      H ${width - cut - t2}
      l ${cut} ${cut + t}
      v ${v/2}
      " />
      `,
      "background-position-y": -t,
      "background-height" : stateHeight
    },
    select: {
      "background-image": `
      <path stroke="${select}" stroke-width="${2 * t2}" stroke-linejoin="round" d="
      M ${t2} ${0}
      v ${v/2}
      l ${cut} ${cut + t}
      H ${width - cut - t2}
      l ${cut} -${cut + t}
      v -${v/2}
      " />
      `,
      "background-position-y": height / 2,
      "background-height" : stateHeight
    },
    decorators: [
      {
        "background-image": `
         ${defs}
         <use href="#octogon" fill="none" stroke="${stroke}" stroke-width="${t2}" stroke-linejoin="round"/>
         <use href="#octogon" fill="${fill}"/>
         `
      }
    ]
  }
}

