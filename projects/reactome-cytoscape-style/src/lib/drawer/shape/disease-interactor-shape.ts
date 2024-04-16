import {extract} from "../../properties-utils";
import {DrawerProvider} from "../types";

export const diseaseInteractor: DrawerProvider = (properties, {width, height, drug, disease, interactor}) => {

  const hover = extract(properties.global.hoverNode);
  const select = extract(properties.global.selectNode);
  const fill = extract(properties.global.negative);
  const t = extract(properties.global.thickness);
  const decorationWidth = extract(properties.interactor.decorationWidth);
  const t4 = t * 4
  const t2 = t * 2;
  const h = height / 2 + t2;
  const midH = height / 2;

  return {
    decorators: [
      {
        "background-image": `
      <path fill="${fill}" stroke-linejoin="round" stroke-linecap="round" stroke-width="${t4}" stroke="${fill}"  d="
      M ${t2} ${midH}
      L ${decorationWidth + t2} ${t2}
      H ${width - (decorationWidth + t2)}
      L ${width - t2} ${midH}
      L ${width - (decorationWidth + t2)} ${height - t2}
      H ${decorationWidth + t2}
      Z
      " />
      `,
      }
    ],

    hover: {
      "background-image": `
      <path stroke="${hover}" stroke-linejoin="round" stroke-linecap="round" stroke-width="${t4}" d="
      M ${t2} ${midH + t2}
      L ${decorationWidth + t2} ${t2}
      H ${width - (decorationWidth + t2)}
      L ${width - t2} ${midH + t2}
      Z
      " />
      `,
      "background-position-y": -t2,
      "background-height": h,
      "background-clip": "none",
      "bounds-expansion": t2,
      "background-image-containment": "over",
    },

    select: {
      "background-image": `
      <path stroke="${select}" stroke-linejoin="round" stroke-linecap="round" stroke-width="${t4}" d="
      M ${t2} 0
      L ${decorationWidth + t2} ${midH}
      H ${width - (decorationWidth + t2)}
      L ${width - t2} 0
      Z
      " />
      `,
      "background-position-y": midH,
      "background-height": h,
      "background-clip": "none",
      "bounds-expansion": t2,
      "background-image-containment": "over",
    }

  }
}


