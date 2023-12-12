import {DrawerProvider} from "../svg-utils";
import {extract} from "../type-utils";
import {Reactome} from "../reactome-style";

export const interactingPathway: DrawerProvider = (width, height, drug) => {
  const select = extract(Reactome.Style.properties.global.select);
  const hover = extract(Reactome.Style.properties.global.hover);
  const thick = extract(Reactome.Style.properties.global.thickness);

  const stroke = !drug ?
    extract(Reactome.Style.properties.interactingPathway.stroke) :
    extract(Reactome.Style.properties.interactingPathway.disease);
  const fill = extract(Reactome.Style.properties.molecule.fill);


  let realWidth = width + 3 * thick;
  const t = 3 * thick;
  return {

    hover: {
      "background-image": `
          <path fill="${hover}" stroke-linejoin="round" stroke-linecap="round"  d="
           M 0 0
           H ${realWidth}
           V ${2*t}
           H 0
           V 0
           Z
           "/>
`,
      "background-position-y": -t/2,
      "background-position-x": -t/2,
      "background-width": realWidth,
      "bounds-expansion": t,
      "background-clip": "none",
      "background-image-containment": "over",
    },
    select: {
      "background-image": `
          <path fill="${select}" stroke-linejoin="round" stroke-linecap="round"  d="
           M 0 0
           H ${width}
           V ${height}
           H 0
           V 0
           Z"/>
`,
      "background-position-y": height - thick,
      "bounds-expansion": thick,
      "background-clip": "none",
      "background-image-containment": "over",
    }
  }
}

