import { Color } from '../models/color';
import { Schedule } from '../models/schedule';

export interface Task {
  id: number;
  color: Color;
  title: string;
  time: Schedule;
  subtasks: Subtask[];
}

export interface Subtask {
  id: number;
  title: string;
  times: number;
  color: Color;
}
