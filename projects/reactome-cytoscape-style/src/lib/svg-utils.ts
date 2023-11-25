function svg(svgStr: string, width = 100, height = 100) {
  const parser = new DOMParser();
  let svgText =
    `<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE svg><svg xmlns='http://www.w3.org/2000/svg' version='1.1' width='${width}' height='${height}'>${svgStr}</svg>`;
  return parser.parseFromString(svgText, 'text/xml').documentElement;
};

export function svgStr(svgText: string, viewPortWidth: number, viewPortHeight: number) {
  let s = svg(svgText, viewPortWidth, viewPortHeight);
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(s.outerHTML);
}
