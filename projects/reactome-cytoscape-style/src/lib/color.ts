export class HSL {
  constructor(public hue: number, public saturation: number, public luminance: number) {
  }

  toString(): string {
    return `hsl(${this.h},${this.s},${this.l})`
  }

  invertL(): this {
    this.l = 100 - this.l;
    return this;
  }

  invertS(): this {
    this.s = 100 - this.s;
    return this;
  }

  invertH(): this {
    this.h = (360 - this.h) % 360;
    return this;
  }

  get h() {
    return this.hue;
  }

  set h(value: number) {
    this.hue = value;
  }

  get s() {
    return this.saturation;
  }

  set s(value: number) {
    this.saturation = value;
  }

  get l() {
    return this.luminance;
  }

  set l(value: number) {
    this.luminance = value;
  }

  static fromHex(hex: string): HSL {
    // Convert hex to RGB first
    let rS: string, gS: string, bS: string;
    let r = 0, g = 0, b = 0;
    if (hex.length == 4) {
      rS = "0x" + hex[1] + hex[1];
      gS = "0x" + hex[2] + hex[2];
      bS = "0x" + hex[3] + hex[3];
    } else if (hex.length == 7) {
      rS = "0x" + hex[1] + hex[2];
      gS = "0x" + hex[3] + hex[4];
      bS = "0x" + hex[5] + hex[6];
    } else throw new Error('Hexadecimal not properly formatted')
    // Then to HSL
    r = Number.parseInt(rS, 16) / 255;
    g = Number.parseInt(gS, 16) / 255;
    b = Number.parseInt(bS, 16) / 255;

    let cmin = Math.min(r, g, b),
      cmax = Math.max(r, g, b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;

    if (delta == 0)
      h = 0;
    else if (cmax == r)
      h = ((g - b) / delta) % 6;
    else if (cmax == g)
      h = (b - r) / delta + 2;
    else
      h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    if (h < 0)
      h += 360;

    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return new HSL(h, s, l);
  }

  toHex(): string {
    const h = this.h;
    const s = this.s /= 100;
    const l = this.l /= 100;

    let c = (1 - Math.abs(2 * l - 1)) * s,
      x = c * (1 - Math.abs((h / 60) % 2 - 1)),
      m = l - c / 2,
      r = 0,
      g = 0,
      b = 0;

    if (0 <= h && h < 60) {
      r = c;
      g = x;
      b = 0;
    } else if (60 <= h && h < 120) {
      r = x;
      g = c;
      b = 0;
    } else if (120 <= h && h < 180) {
      r = 0;
      g = c;
      b = x;
    } else if (180 <= h && h < 240) {
      r = 0;
      g = x;
      b = c;
    } else if (240 <= h && h < 300) {
      r = x;
      g = 0;
      b = c;
    } else if (300 <= h && h < 360) {
      r = c;
      g = 0;
      b = x;
    }
    // Having obtained RGB, convert channels to hex
    let rS = Math.round((r + m) * 255).toString(16);
    let gS = Math.round((g + m) * 255).toString(16);
    let bS = Math.round((b + m) * 255).toString(16);

    // Prepend 0s, if necessary
    if (rS.length == 1)
      rS = "0" + rS;
    if (gS.length == 1)
      gS = "0" + gS;
    if (bS.length == 1)
      bS = "0" + bS;

    return "#" + rS + gS + bS;
  }
}
