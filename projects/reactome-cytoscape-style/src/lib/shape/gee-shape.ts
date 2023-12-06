import {Reactome} from "../reactome-style";
import {extract} from "../type-utils";
import {DrawerProvider} from "../svg-utils";

// TODO Switch to dashed line
export const genomeEncodedEntity: DrawerProvider = (width, height) => {
  const select = extract(Reactome.Style.properties.global.select);
  const hover = extract(Reactome.Style.properties.global.hover);
  const t = extract(Reactome.Style.properties.global.thickness);
  const radius = extract(Reactome.Style.properties.genomeEncodedEntity.radius);
  const fill = extract(Reactome.Style.properties.genomeEncodedEntity.fill);
  const stroke = extract(Reactome.Style.properties.genomeEncodedEntity.stroke);

  const oR = radius + t;
  const iR = radius - t;

  const st = 2 * t;
  const pattern = 3 * st;

  const defs = `
  <defs>
    <rect id="rect" rx="${radius}" ry="${radius}" x="0" y="0" width="${width}" height="${height}"/>
    <clipPath id="clip">
      <use href="#rect"/>
    </clipPath>
  </defs>
  `
  return {
    background: {
      "background-image": `
        ${defs}
        <use href="#rect" clip-path="url(#clip)" stroke-width="${st}" stroke="${stroke}" fill="none" stroke-linecap="round" stroke-dasharray="${pattern} ${pattern}"/>
      `
    },
    hover: {
      "background-image": `
          <path fill="${hover}" stroke-linejoin="round" stroke-linecap="round"  d="
            M 0 ${oR}
            a ${oR} ${oR} 0 0 1 ${oR} -${oR}
            h ${width - 2 * oR}
            a ${oR} ${oR} 0 0 1 ${oR} ${oR}
            a ${oR} ${iR} 0 0 0 -${oR} -${iR}
            h -${width - 2 * oR}
            a ${oR} ${iR} 0 0 0 -${oR} ${iR}
            Z"/>
`,
      "background-position-y": -t,
      "bounds-expansion": t,
      "background-clip": "none",
      "background-image-containment": "over",
      "background-height": oR,
    },
    select: {
      "background-image": `
          <path fill="${select}" stroke-linejoin="round" stroke-linecap="round"  d="
            M 0 0
            a ${oR} ${oR} 0 0 0 ${oR} ${oR}
            h ${width - 2 * oR}
            a ${oR} ${oR} 0 0 0 ${oR} -${oR}
            a ${oR} ${iR} 0 0 1 -${oR} ${iR}
            h -${width - 2 * oR}
            a ${oR} ${iR} 0 0 1 -${oR} -${iR}
            Z"/>
`,
      "background-position-y": height - radius,
      "bounds-expansion": t,
      "background-clip": "none",
      "background-image-containment": "over",
      "background-height": oR,
    }
  }
}


