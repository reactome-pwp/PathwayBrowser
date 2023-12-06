import {memoize} from "lodash";
import {Reactome} from "../reactome-style";
import {extract} from "../type-utils";
import {DrawerProvider} from "../svg-utils";


export const entitySet: DrawerProvider = (width, height, disease) => {
  const select = extract(Reactome.Style.properties.global.select);
  const hover = extract(Reactome.Style.properties.global.hover);

  const t = extract(Reactome.Style.properties.global.thickness);
  const r = extract(Reactome.Style.properties.entitySet.radius);
  const fill = !disease ?
    extract(Reactome.Style.properties.entitySet.fill) :
    extract(Reactome.Style.properties.entitySet.disease);
  const stroke = extract(Reactome.Style.properties.entitySet.stroke);

  const r2 = r * 2;
  const t2 = t * 2;
  const v = height / 2 - r2 - t; // Vertical
  const stateHeight = height / 2 + t;

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

  return {
    background: {
      "background-image": `
       ${defs}
       <use href="#curly" fill="${fill}" stroke="${fill}" stroke-width="${t2}" stroke-linejoin="round"/>
       `
    },
    hover: {
      "background-image": `
       <path stroke="${hover}" stroke-width="${t2}" fill="none" stroke-linejoin="round" d="
         M ${t + r} ${stateHeight + r}
         a ${r} ${r} 0 0 0 -${r} -${r}
         a ${r} ${r} 0 0 0 ${r} -${r}
         v -${v}
         a ${r} ${r + t} 0 0 1 ${r} -${r + t}
         H ${width - r2 - t}
         a ${r} ${r + t} 0 0 1 ${r} ${r + t}
         v ${v}
         a ${r} ${r} 0 0 0 ${r} ${r}
         a ${r} ${r} 0 0 0 -${r} ${r}
       "/>
       <line stroke-width="${t}" stroke="${stroke}" x1="${r2 + t}" x2="${width - r2 - t}" y1="${2.5 * t}" y2="${2.5 * t}"/>
       `,
      "background-position-y": -t,
      "background-height": stateHeight
    },
    select: {
      "background-image": `
       <path stroke="${select}" stroke-width="${t2}" fill="none" stroke-linejoin="round" d="
         M ${t + r} ${- r}
         a ${r} ${r} 0 0 1 -${r} ${r}
         a ${r} ${r} 0 0 1 ${r} ${r}
         v ${v}
         a ${r} ${r + t} 0 0 0 ${r} ${r + t}
         H ${width - r2 - t}
         a ${r} ${r + t} 0 0 0 ${r} -${r + t}
         v -${v}
         a ${r} ${r} 0 0 1 ${r} -${r}
         a ${r} ${r} 0 0 1 -${r} -${r}
       "/>
       <line stroke-width="${t}" stroke="${stroke}" x1="${r2 + t}" x2="${width - r2 - t}" y1="${stateHeight - 2.5 * t}" y2="${stateHeight - 2.5 * t}"/>
        `,
      "background-position-y": height / 2,
      "background-height": stateHeight
    },
    decorators: [
      {
        "background-image": `
       ${defs}
       <use href="#curly" fill="none" stroke="${stroke}" stroke-width="${t2}" clip-path="url(#inside)"/>
       <rect fill="${fill}" x="${t2 + r2}" y="${t}"
             width="${width - 2 * r2 - 2 * t2}"
             height="${height - t2}"/>
       `
      }
    ]
  }
}

//
//
//
