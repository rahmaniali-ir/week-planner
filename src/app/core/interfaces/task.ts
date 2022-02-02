import { Weekday } from './week';

export interface Task {
  id: number;
  color?: string;
  title: string;
  repetition: number;
  duration: number;
}

export interface PlannedTask {
  task: Task;
  weekday: Weekday;
  start: number;
  [key: string]: any;
}
