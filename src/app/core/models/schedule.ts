import { Weekday } from '../interfaces/week';

const BLOCK_MINUTES = 60 / 4;

export class Schedule {
  public weekday: Weekday;
  public from: number;
  public to: number;

  constructor(weekday: Weekday = 'Saturday', from: number = 0, to: number = 0) {
    this.weekday = weekday;
    this.from = from;
    this.to = to;
  }

  public get duration() {
    return this.to - this.from;
  }

  public static unitBlockToMinutes(unit: number = 0) {
    return unit * BLOCK_MINUTES;
  }
}
