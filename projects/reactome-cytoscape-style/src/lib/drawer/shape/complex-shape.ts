import {extract} from "../../properties-utils";
import {DrawerProvider} from "../types";


export const complex: DrawerProvider = (properties, width, height, drug, disease, interactor) => {
  const select = extract(properties.global.selectNode);
  const hover = extract(properties.global.hoverNode);

  const t = extract(properties.global.thickness);
  const cut = extract(properties.complex.cut);
  const fill = !drug ?
    interactor ? extract(properties.interactor.fill) : extract(properties.complex.fill) :
    extract(properties.complex.drug);

  const stroke = !disease ? extract(properties.complex.stroke) : extract(properties.global.negativeContrast);

  const cut2 = cut * 2;
  const t2 = t * 2;
  const v = height - cut2 - 2 * t2; // Vertical

  const delta = 0;
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
      v -${v / 2}
      l ${cut} -${cut + t}
      H ${width - cut - t2}
      l ${cut} ${cut + t}
      v ${v / 2}
      " />
      `,
      "background-position-y": -t,
      "background-height": stateHeight,
      "background-clip": "none",
      "bounds-expansion": t
    },
    select: {
      "background-image": `
      <path stroke="${select}" stroke-width="${2 * t2}" stroke-linejoin="round" d="
      M ${t2} ${0}
      v ${v / 2}
      l ${cut} ${cut + t}
      H ${width - cut - t2}
      l ${cut} -${cut + t}
      v -${v / 2}
      " />
      `,
      "background-position-y": height / 2,
      "background-height": stateHeight,
      "background-clip": "none",
      "bounds-expansion": t
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

