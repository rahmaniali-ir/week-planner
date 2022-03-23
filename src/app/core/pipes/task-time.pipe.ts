import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'taskTime',
})
export class TaskTimePipe implements PipeTransform {
  transform(value: number, ...args: unknown[]): unknown {
    const hours = Math.floor(value / 60);
    const minutes = value - hours * 60;

    const h = (hours < 10 ? '0' : '') + hours;
    const m = (minutes < 10 ? '0' : '') + minutes;

    return `${h}:${m}`;
  }
}
