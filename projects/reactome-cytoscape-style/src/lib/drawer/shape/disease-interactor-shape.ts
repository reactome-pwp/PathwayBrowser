import {extract} from "../../properties-utils";
import {DrawerProvider} from "../types";

export const diseaseInteractor: DrawerProvider = (properties, width, height, drug, disease, interactor) => {

  const hover = extract(properties.global.hoverNode);
  const t = extract(properties.global.thickness);
  const oR = t;
  const iR = -t;
  const oRx = Math.min(oR, width / 2)
  const start = width * 0.25;

  return {
    hover: {
      "background-image": `
          <path fill="${hover}" stroke-linejoin="round" stroke-linecap="round"  d="
            M 0 ${oR}
            a ${oRx} ${oR} 0 0 1 ${oRx} -${oR}
            h ${width / 2 - t * 2}
            a ${oRx} ${oR} 0 0 1 ${oRx} ${oR}
            a ${oRx} ${iR} 0 0 0 -${oRx} -${iR}
            h -${width / 2 - t * 2}
            a ${oRx} ${iR} 0 0 0 -${oRx} ${iR}
             Z"/>
`,
      "background-position-y": -t,
      "background-position-x": start,
      "bounds-expansion": t,
      "background-clip": "none",
      "background-image-containment": "over"
    }
  }
}


