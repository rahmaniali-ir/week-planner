export class PixelRatio {
  private _total: number;
  private steps: number;
  private stepBlocks: number = 4;

  constructor(steps: number = 1, total: number = 0) {
    this._total = total;
    this.steps = Math.max(0, steps);
  }

  public get total() {
    return this._total - 1;
  }

  public get unit() {
    return this.total / (this.steps * this.stepBlocks);
  }

  public updateTotal(total: number = 0) {
    this._total = total;
  }

  public toUnit(value: number) {
    return value / this.unit;
  }

  public toPerfectUnit(value: number) {
    return Math.floor(this.toUnit(value));
  }

  public fromUnit(value: number) {
    return this.unit * value;
  }
}
