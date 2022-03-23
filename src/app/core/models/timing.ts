import { Weekday } from '../types/weekday';

export class TimeBlock {
  weekday: Weekday;
  from: number;
  to: number;

  constructor(weekday: Weekday, from: number = 0, to: number = 0) {
    this.weekday = weekday;
    this.from = from;
    this.to = to;
  }

  get duration() {
    return this.to - this.from;
  }

  move(diff: number) {
    this.from += diff;
    this.to += diff;

    return this;
  }

  clone() {
    return new TimeBlock(this.weekday, this.from, this.to);
  }
}
