import { Color } from '../models/color';

export interface Breakpoint {
  id: number;
  position: number;
  color: Color;
  immutable?: boolean;
  name?: string;
}
