import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { PlanService } from '../../services/plan.service';
import { Breakpoint } from '../../types/breakpoint';
import { Weekday } from '../../types/weekday';

@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.sass'],
})
export class BoardComponent implements OnInit {
  @ViewChild('body') body!: ElementRef<HTMLElement>;
  public weekdays: Weekday[] = [
    'Saturday',
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
  ];
  date: Date;

  constructor(private planService: PlanService) {
    this.date = new Date();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.planService.PBC.setElement(this.body.nativeElement);
    }, 0);
  }

  get currentWeekday() {
    let index = this.date.getDay() + 1;

    if (index === 7) index = 0;

    return this.weekdays[index];
  }

  get allPlansTimings() {
    return this.planService.allPlansTimings;
  }

  get isMovingTiming() {
    return this.planService.isMovingTiming;
  }

  get cursor() {
    if (!this.isMovingTiming) return null;

    if (this.planService.movingBy === 'middle')
      return this.planService.isAltKeyDown ? 'copy' : 'move';

    return 'ew-resize';
  }

  get breakpoints() {
    return this.planService.breakpoints;
  }

  get currentTimeBlock() {
    return this.planService.currentTimeBlock;
  }

  getBreakpointOffset(breakpoint: Breakpoint) {
    return this.planService.getBreakpointOffset(breakpoint) + 150 + 'px';
  }

  getWeekdayTimings(weekday: Weekday) {
    return this.planService.getWeekdayTimings(weekday);
  }

  addTiming(weekday: Weekday, e: MouseEvent) {
    this.planService.addPlan(weekday, e.offsetX);
  }

  onMouseMove(e: MouseEvent) {
    const target = e.target as HTMLElement;
    const x = e.offsetX;
    const offsetX =
      target.tagName !== 'PLAN-TIMING' ? x : target.offsetLeft + x;

    if (this.planService.isMovingTiming)
      this.planService.movingTimingOffset$.next(offsetX);
    else this.planService.movingTimingOffset = offsetX;
  }

  moveTimingToWeekday(weekday: Weekday) {
    this.planService.moveTimingToWeekday(weekday);
  }
}
