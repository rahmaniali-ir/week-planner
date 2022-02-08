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
