import { Color } from '../models/color';
import { Schedule } from '../models/schedule';

export interface Topic {
  id: number;
  title: string;
  times: Scheduled[];
  tasks: Task[];
  color: Color;
}

export interface Scheduled {
  topic: Topic;
  time: Schedule;
}

export interface Task {
  id: number;
  title: string;
  times: number;
  color: Color;
}
