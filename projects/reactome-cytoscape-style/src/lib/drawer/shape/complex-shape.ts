import {extract} from "../../properties-utils";
import {DrawerProvider} from "../types";


export const complex: DrawerProvider = (properties, {
  width,
  height,
  drug,
  disease,
  interactor,
  lossOfFunction,
  gradient
}) => {
  const select = extract(properties.global.selectNode);
  const hover = extract(properties.global.hoverNode);
  const flag = extract(properties.global.flag);

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
      M ${cut + t2 + delta} ${t2}
      H ${width - cut - t2 - delta}
      l ${cut} ${cut}
      v ${v}
      l -${cut} ${cut}
      H ${cut + t2 + delta}
      l -${cut} -${cut}
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
      <path stroke="${hover}" fill="none" stroke-width="${2 * t2}" stroke-linejoin="round" d="
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
      <path stroke="${select}" fill="none" stroke-width="${2 * t2}" stroke-linejoin="round" d="
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
    flag: {
      "background-image": `
<path id="octogon" d="
      M ${width / 2} ${3 * t}
      H ${width - cut - delta}
      l ${cut + t} ${cut}
      v ${v}
      l -${cut + t} ${cut}
      H ${cut + delta + 2 * t2}
      l -${cut + t} -${cut}
      v -${v}
      l  ${cut + t} -${cut}
      Z
      " stroke="${flag}" stroke-width="${3 * t2}" stroke-linejoin="round"/>
`,
      "background-position-x": -2 * t,
      "background-position-y": -t,
      "bounds-expansion": 2 * t,
      "background-clip": "none",
      "background-image-containment": "over",
      "background-width": width + 4 * t,
      "background-height": height + 2 * t,
    },
    decorators: [
      {
        "background-image": `
         ${defs}${gradient || ''}
         <use href="#octogon" fill="none" stroke="${stroke}" stroke-width="${t2}" stroke-linejoin="round" ${lossOfFunction ? `stroke-dasharray="${t2}"` : ''} />
         <use href="#octogon" fill="${gradient ? 'url(#gradient)' : fill}"/>
         `
      }
    ],
  }
}

