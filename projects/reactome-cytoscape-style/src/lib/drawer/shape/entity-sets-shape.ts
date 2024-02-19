import {extract} from "../../properties-utils";
import {DrawerProvider} from "../types";


export const entitySet: DrawerProvider = (properties, {width, height, drug, disease, lossOfFunction}) => {
  const select = extract(properties.global.selectNode);
  const hover = extract(properties.global.hoverNode);
  const flag = extract(properties.global.flag);

  const t = extract(properties.global.thickness);
  let r = extract(properties.entitySet.radius);

  if (2 * r > height / 2 - t) {

    r = height / 4 - (t / 2);
  }

  width += 2 * r;

  const fill = !drug ?
    extract(properties.entitySet.fill) :
    extract(properties.entitySet.drug);
  const stroke = !disease ?
    extract(properties.entitySet.stroke) :
    extract(properties.global.negativeContrast);

  const r2 = r * 2;
  const t2 = t * 2;
  const v = height / 2 - r2 - t; // Vertical
  const stateHeight = height / 2 + t;
  const bracesOffset = r2 + t2;

  let realDashLength = width;

  if (lossOfFunction) {
    const hidingLength = width - 2 * bracesOffset;
    const idealDashLength = t2;
    const dashNumber = Math.round((hidingLength / idealDashLength + 1) / 2);
    realDashLength = hidingLength / (2 * dashNumber - 1);
  }


  const defs = `<defs>
   <path id="curly" d="
       M ${r2 + t} ${t}
       H ${width - r2 - t}
       a ${r} ${r} 0 0 1 ${r} ${r}

       v ${v}
       a ${r} ${r} 0 0 0 ${r} ${r}
       a ${r} ${r} 0 0 0 -${r} ${r}
       v ${v}

       a ${r} ${r} 0 0 1 -${r} ${r}
       H ${r2 + t}
       a ${r} ${r} 0 0 1 -${r} -${r}

       v -${v}
       a ${r} ${r} 0 0 0 -${r} -${r}
       a ${r} ${r} 0 0 0 ${r} -${r}
       v -${v}

       a ${r} ${r} 0 0 1 ${r} -${r}
       Z
       "/>
   <clipPath id="inside">
     <use href="#curly"/>
   </clipPath>
 </defs>`;

  const t1_5 = t * 1.5;
  return {
    background: {
      "background-image": `
       ${defs}
       <use href="#curly" fill="${fill}" stroke="${fill}" stroke-width="${t2}" stroke-linejoin="round"/>
       `,
      "background-position-x": -r,
      "background-width": width + 2 * r,
      "background-clip": "none",
      "bounds-expansion": 2 * t
    },
    hover: {
      "background-image": `
       <path stroke="${hover}" stroke-width="${t2}" fill="none" stroke-linejoin="round" d="
         M ${r + t} ${stateHeight + r}
         a ${r} ${r} 0 0 0 -${r} -${r}
         a ${r} ${r} 0 0 0 ${r} -${r}
         v -${v}
         a ${r} ${r + t} 0 0 1 ${r} -${r + t}
         H ${width - r2 - t}
         a ${r} ${r + t} 0 0 1 ${r} ${r + t}
         v ${v}
         a ${r} ${r} 0 0 0 ${r} ${r}
         a ${r} ${r} 0 0 0 -${r} ${r}
       "/>`,
      "background-position-x": -r,
      "background-width": width + 2 * r,

      "background-clip": "none",
      "bounds-expansion": 2 * t,

      "background-position-y": -t,
      "background-height": stateHeight
    },
    select: {
      "background-image": `
       <path stroke="${select}" stroke-width="${t2}" fill="none" stroke-linejoin="round" d="
         M ${r + t} ${-r}
         a ${r} ${r} 0 0 1 -${r} ${r}
         a ${r} ${r} 0 0 1 ${r} ${r}
         v ${v}
         a ${r} ${r + t} 0 0 0 ${r} ${r + t}
         H ${width - r2 - t}
         a ${r} ${r + t} 0 0 0 ${r} -${r + t}
         v -${v}
         a ${r} ${r} 0 0 1 ${r} -${r}
         a ${r} ${r} 0 0 1 -${r} -${r}
       "/>`,
      "background-position-x": -r,
      "background-width": width + 2 * r,

      "background-clip": "none",
      "bounds-expansion": 2 * t,

      "background-position-y": height / 2,
      "background-height": stateHeight
    },
    flag: {
      "background-image": `
<rect width="${width}" height="${height + 2 * t}" rx="${r + 3 * t}" ry="${r + t2}" fill="${flag}"/>
`,
      "background-position-x": -2 * t,
      "background-position-y": -t,
      "bounds-expansion": 2 * t,
      "background-clip": "none",
      "background-image-containment": "over",
      "background-width": width,
      "background-height": height + 2 * t,
    },
    decorators: [
      {
        "background-image": `
       ${defs}
       <use href="#curly" fill="none" stroke="${stroke}" stroke-width="${t2}" clip-path="url(#inside)"/>
       <line x1="${bracesOffset}" x2="${width - bracesOffset}" y1="${t2}" y2="${t2}" stroke-width="${t2}" ${lossOfFunction ? `stroke-dasharray="${realDashLength}"` : ''}  stroke="${fill}"/>
       <line x1="${bracesOffset}" x2="${width - bracesOffset}" y1="${height - t2}" y2="${height - t2}" stroke-width="${t2}" ${lossOfFunction ? `stroke-dasharray="${realDashLength}"` : ''}  stroke="${fill}"/>
       `,
        "background-position-x": -r,
        "bounds-expansion": r,
        "background-clip": "none",
        "background-width": width + 2 * r,
      },

    ]
  }
}

//
//
//
