import { Random } from './random';

export class Color {
  private h: number = 0;
  private s: number = 0;
  private l: number = 0;

  public get hue() {
    return this.h;
  }
  public set hue(value: number) {
    value = value % 360;
    this.h = value < 0 ? 360 - Math.abs(value) : value;
  }

  public get saturation() {
    return this.s;
  }
  public set saturation(value: number) {
    this.s = Math.max(0, Math.min(100, value));
  }

  public get lightness() {
    return this.l;
  }
  public set lightness(value: number) {
    this.l = Math.max(0, Math.min(100, value));
  }

  constructor(h: number = 0, s: number = 0, l: number = 0) {
    this.hue = h;
    this.saturation = s;
    this.lightness = l;
  }

  public get hsl(): string {
    return `hsl(${this.h}, ${this.s}%, ${this.l}%)`;
  }
  public set hsl(value: string | Color) {
    if (value instanceof Color) {
      this.hsl = value.hsl;
    } else {
      const [h, s, l] = value
        .replace('hsl', '')
        .trim()
        .replace(/[()% ]/gi, '')
        .split(',');

      this.hue = Number(h);
      this.saturation = Number(s);
      this.lightness = Number(l);
    }
  }

  public get hex() {
    let h = this.hue,
      s = this.saturation,
      l = this.lightness;
    s /= 100;
    l /= 100;

    let c = (1 - Math.abs(2 * l - 1)) * s,
      x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
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
    let r2 = Math.round((r + m) * 255).toString(16);
    let g2 = Math.round((g + m) * 255).toString(16);
    let b2 = Math.round((b + m) * 255).toString(16);

    // Prepend 0s, if necessary
    if (r2.length == 1) r2 = '0' + r;
    if (g2.length == 1) g2 = '0' + g;
    if (b2.length == 1) b2 = '0' + b;

    return '#' + r2 + g2 + b2;
  }
  public set hex(hex: string) {
    // Convert hex to RGB first
    let r = 0,
      g = 0,
      b = 0;
    if (hex.length == 4) {
      r = Number('0x' + hex[1] + hex[1]);
      g = Number('0x' + hex[2] + hex[2]);
      b = Number('0x' + hex[3] + hex[3]);
    } else if (hex.length == 7) {
      r = Number('0x' + hex[1] + hex[2]);
      g = Number('0x' + hex[3] + hex[4]);
      b = Number('0x' + hex[5] + hex[6]);
    }
    // Then to HSL
    r /= 255;
    g /= 255;
    b /= 255;
    let cmin = Math.min(r, g, b),
      cmax = Math.max(r, g, b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;

    if (delta == 0) h = 0;
    else if (cmax == r) h = ((g - b) / delta) % 6;
    else if (cmax == g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    if (h < 0) h += 360;

    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    this.hsl = 'hsl(' + h + ',' + s + '%,' + l + '%)';
  }

  public log(message: string | null = null) {
    if (message === null) message = this.hsl;

    console.log('%c' + message, 'color: ' + this.hsl);

    return this;
  }

  public rotateHue(degree: number = 0) {
    this.hue += degree;

    return this;
  }

  public normalize() {
    this.saturation = 100;
    this.lightness = 50;

    return this;
  }

  public complementary() {
    return Color.clone(this).rotateHue(180);
  }

  static clone(c: Color) {
    return new Color(c.hue, c.saturation, c.lightness);
  }

  static random() {
    return new Color(
      Random.generate(0, 360),
      Random.generate(0, 100),
      Random.generate(0, 100)
    );
  }

  static GenerateAnalogous(
    length: number = 1,
    hue: number | null = null,
    step: number = 20
  ) {
    if (length < 1) return [];
    if (hue === null) hue = Random.generate(0, 360);

    const base = new Color(hue, 100, 50);
    const middle = Math.floor(length / 2);
    base.rotateHue(-middle * step);

    return Array(length)
      .fill(null)
      .map(() => {
        const c = Color.clone(base);
        base.rotateHue(step);
        return c;
      });
  }
}
