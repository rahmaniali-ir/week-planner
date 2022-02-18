import { IconName } from '../components/icon/iconPack';
import { Color } from '../models/color';
import { TimeBlock } from '../models/timing';

export interface Plan {
  id: number;
  name: string;
  color: Color;
  timings: Timing[];
  icon?: IconName;
  tasks?: Task[];
}

export interface Task {
  id: number;
  plan: Plan;
  name: string;
  color: Color;
  count: number;
}

export interface Timing {
  id: number;
  plan: Plan;
  time: TimeBlock;
}
