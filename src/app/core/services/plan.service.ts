import { Injectable } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { ModalService } from 'src/app/modal/services/modal.service';
import { ConfirmModalComponent } from '../components/confirm-modal/confirm-modal.component';
import { ViewTaskModalComponent } from '../components/view-task-modal/view-task-modal.component';
import { ViewPlanComponent } from '../components/view-plan/view-plan.component';
import { Edge } from '../interfaces/edge';
import { Weekday } from '../interfaces/week';
import { Color } from '../models/color';
import { PixelBlockConverter } from '../models/pixelBlockConverter';
import { PixelRatio } from '../models/pixelRatio';
import { Schedule } from '../models/schedule';
import { TimeBlock } from '../models/timing';
import { MovingAnchor } from '../types/moving';
import { Plan, Timing } from '../types/plan';
import { Breakpoint } from '../types/breakpoint';
import { backgrounds } from '../backgrounds';

@Injectable({
  providedIn: 'root',
})
export class PlanService {
  hourBlockDivider = 4; // 15 minutes
  eachHourBlockDuration = 60 / this.hourBlockDivider;
  numberOfTimeBlocks = 24 * this.hourBlockDivider;
  newTimingDuration = 16; // 4 hours
  minTimingDuration = 1; // 15 minutes
  PBC = new PixelBlockConverter(this.numberOfTimeBlocks);

  plans: Plan[] = [];
  breakpoints: Breakpoint[] = [
    {
      id: 1,
      color: new Color(27, 100, 60),
      position: 24,
      name: 'Morning',
    },
  ];

  // moving feature
  private originalMovingTiming: Timing | null = null;
  private movingTiming: Timing | null = null;
  private referenceTiming: Timing | null = null;
  movingTiming$: Subject<Timing | null> = new Subject();
  movingBy: MovingAnchor = 'none';
  movingTimingAnchor = 0;
  movingTimingOffset = 0;
  movingTimingOffset$: Subject<number> = new Subject();
  private altKey = false;
  private makingNewReference = false;

  // general
  background = backgrounds[0];
  click$ = new Subject<MouseEvent>();
  currentTimeBlock = 0;

  constructor(private modalService: ModalService) {
    this.movingTiming$.subscribe((timing) => {
      if (timing) {
        // keep the original timing as reference
        this.originalMovingTiming = {
          id: timing.id,
          plan: timing.plan,
          time: new TimeBlock(
            timing.time.weekday,
            timing.time.from,
            timing.time.to
          ),
        };

        this.movingTiming = timing;
      } else {
        if (this.referenceTiming) {
          const reference = this.referenceTiming;
          const isRangeEmpty = this.getInRangeTimings(
            reference.time.weekday,
            reference.time.from,
            reference.time.to
          ).filter((t) => t !== reference);

          if (isRangeEmpty.length > 0) {
            reference.plan.timings = reference.plan.timings.filter(
              (t) => t !== reference
            );
          }
        }

        this.originalMovingTiming = null;
        this.movingTiming = null;
        this.referenceTiming = null;
        this.makingNewReference = false;
      }
    });

    this.movingTimingOffset$.subscribe((offset) => {
      this.movingTimingOffset = offset;

      if (this.movingBy === 'beginning') this.moveTimingBeginning();
      else if (this.movingBy === 'end') this.moveTimingEnd();
      else if (this.movingBy === 'middle' && this.altKey)
        this.addTimingToPlan();
      else if (this.movingBy === 'middle') this.moveTimingMiddle();
    });

    window.addEventListener('mouseup', () => {
      if (this.movingBy !== 'none') {
        this.movingBy = 'none';
        this.movingTimingAnchor = 0;
        this.movingTiming$.next(null);
      }
    });

    window.addEventListener('keydown', (e) => {
      this.altKey = e.altKey;
      if (this.altKey) e.preventDefault();
    });

    window.addEventListener('keyup', (e) => {
      this.altKey = false;
    });

    window.addEventListener('click', (e) => {
      this.click$.next(e);
    });

    window.addEventListener('beforeunload', () => {
      this.saveToLocalStorage();
    });

    window.addEventListener('blur', () => {
      this.saveToLocalStorage();
    });

    const nowBreakpointColor = new Color(0, 100, 100);
    nowBreakpointColor.alpha = 0.5;
    const nowBreakpoint: Breakpoint = {
      id: 0,
      name: 'Now',
      position: 0,
      color: nowBreakpointColor,
      immutable: true,
    };
    setInterval(() => {
      const date = new Date();
      const hours = date.getHours();
      const minutes = date.getMinutes();

      this.currentTimeBlock =
        (hours * 60 + minutes) / this.eachHourBlockDuration;
      nowBreakpoint.name = `Now (${hours}: ${minutes})`;

      if (nowBreakpoint.position !== this.currentTimeBlock) {
        nowBreakpoint.position = this.currentTimeBlock;
      }
    }, 1000);
    this.breakpoints.push(nowBreakpoint);

    setTimeout(() => {
      this.loadFromLocalStorage();

      // setTimeout(() => {
      //   this.viewPlan(this.plans[0].timings[0]);
      // }, 100);
    }, 0);
  }

  private get movingTimingOffsetBlock() {
    return this.PBC.pixelToPerfectBlock(this.movingTimingOffset);
  }

  get allPlansTimings() {
    const timings: Timing[] = [];

    this.plans.forEach((plan) => {
      timings.push(...plan.timings);
    });

    return timings;
  }

  get isMovingTiming() {
    return this.movingBy !== 'none';
  }

  get isAltKeyDown() {
    return this.altKey;
  }

  get currentMovingTiming() {
    return this.movingTiming;
  }

  private getNextPlanId() {
    if (this.plans.length === 0) return 1;

    return this.plans[this.plans.length - 1].id + 1;
  }

  private getNextPlanTimingId(plan: Plan) {
    if (plan.timings.length === 0) return 0;

    return plan.timings[plan.timings.length - 1].id + 1;
  }

  private saveToLocalStorage() {
    const plans: any[] = [];

    this.plans.forEach((plan) => {
      const { id, color, name, timings, icon, tasks } = plan;

      const cleanTimings: any[] = [];

      timings.forEach((timing) => {
        cleanTimings.push({
          id: timing.id,
          time: { ...timing.time },
        });
      });

      plans.push({
        id,
        name,
        color: color.hsl,
        timings: cleanTimings,
        icon,
        tasks,
      });
    });

    localStorage.setItem('plans', JSON.stringify(plans));
  }

  private loadFromLocalStorage() {
    const localStoragePlans = localStorage.getItem('plans');

    if (!localStoragePlans) return;

    const storedPlans = JSON.parse(localStoragePlans) as Plan[];

    const plans: Plan[] = [];

    storedPlans.forEach((storedPlan) => {
      const { id, name, timings: storedTimings, icon, tasks } = storedPlan;

      const color = new Color();
      color.hsl = storedPlan.color;
      storedPlan.color = color;

      const plan: Plan = {
        id,
        name,
        timings: [],
        color,
        icon,
        tasks,
      };

      const timings: Timing[] = storedTimings.map((t) => {
        return {
          id: t.id,
          plan: plan,
          time: new TimeBlock(t.time.weekday, t.time.from, t.time.to),
        };
      });

      plan.timings = timings;

      this.plans.push(plan);
    });
  }

  getWeekdayTimings(weekday: Weekday) {
    return this.allPlansTimings.filter(
      (timing) => timing.time.weekday === weekday
    );
  }

  getInRangeTimings(weekday: Weekday, from: number, to: number) {
    return this.getWeekdayTimings(weekday).filter(
      (timing) => timing.time.to > from && timing.time.from < to
    );
  }

  isRangeEmpty(weekday: Weekday, from: number, to: number) {
    return this.getInRangeTimings(weekday, from, to).length === 0;
  }

  addPlan(weekday: Weekday, fromInPixels: number) {
    const from = this.PBC.pixelToPerfectBlock(fromInPixels);
    const to = Math.min(this.numberOfTimeBlocks, from + this.newTimingDuration);

    if (!this.isRangeEmpty(weekday, from, to)) return;

    const plan: Plan = {
      id: this.getNextPlanId(),
      name: '',
      icon: 'user',
      color: Color.random().normalize(),
      timings: [],
      tasks: [],
    };

    const time = new TimeBlock(weekday, from, to);
    const timing: Timing = {
      id: 1,
      plan,
      time,
    };

    plan.timings.push(timing);
    this.plans.push(plan);

    this.viewPlan(timing);
  }

  moveTimingBeginning() {
    if (!this.originalMovingTiming || !this.movingTiming) return;

    // stop if the "offsetBlock" will be larger that the minimum duration
    if (
      this.movingTimingOffsetBlock >
        this.originalMovingTiming.time.to - this.minTimingDuration ||
      this.getInRangeTimings(
        this.movingTiming.time.weekday,
        this.movingTimingOffsetBlock,
        this.movingTiming.time.to
      ).length > 1
    )
      return;

    this.movingTiming.time.from = this.movingTimingOffsetBlock;
  }

  moveTimingEnd() {
    if (!this.originalMovingTiming || !this.movingTiming) return;

    // stop if the "offsetBlock" will be larger that the minimum duration
    if (
      this.movingTimingOffsetBlock <
        this.originalMovingTiming.time.from + this.minTimingDuration ||
      this.getInRangeTimings(
        this.movingTiming.time.weekday,
        this.movingTiming.time.from,
        this.movingTimingOffsetBlock
      ).length > 1
    )
      return;

    this.movingTiming.time.to = this.movingTimingOffsetBlock;
  }

  moveTimingMiddle() {
    if (!this.originalMovingTiming || !this.movingTiming) return;

    const beginningAnchorPixels =
      this.PBC.blockToPixel(this.originalMovingTiming.time.from) +
      this.movingTimingAnchor;

    const diff = this.PBC.pixelToPerfectBlock(
      this.movingTimingOffset - beginningAnchorPixels
    );

    const timing = this.originalMovingTiming.time.clone().move(diff);

    const inRange = this.getInRangeTimings(
      this.movingTiming.time.weekday,
      timing.from,
      timing.to
    ).filter((t) => t !== this.movingTiming);

    // stop if the "offsetBlock" will be larger that the minimum duration
    if (
      timing.from < 0 ||
      timing.to > this.numberOfTimeBlocks ||
      inRange.length > 0
    )
      return;

    this.movingTiming.time.from = timing.from;
    this.movingTiming.time.to = timing.to;
  }

  addTimingToPlan() {
    if (!this.originalMovingTiming || !this.movingTiming) return;

    if (!this.makingNewReference) {
      const newTiming: Timing = {
        id: this.getNextPlanTimingId(this.originalMovingTiming.plan),
        plan: this.originalMovingTiming.plan,
        time: this.originalMovingTiming.time.clone(),
      };

      this.makingNewReference = true;
      this.referenceTiming = newTiming;
      this.originalMovingTiming.plan.timings.push(newTiming);

      this.movingTiming$.next(newTiming);
    }

    const beginningAnchorPixels =
      this.PBC.blockToPixel(this.originalMovingTiming.time.from) +
      this.movingTimingAnchor;

    const diff = this.PBC.pixelToPerfectBlock(
      this.movingTimingOffset - beginningAnchorPixels
    );

    const timing = this.originalMovingTiming.time.clone().move(diff);

    const inRange = this.getInRangeTimings(
      this.movingTiming.time.weekday,
      timing.from,
      timing.to
    ).filter((t) => t !== this.movingTiming);

    // stop if the "offsetBlock" will be larger that the minimum duration
    if (
      timing.from < 0 ||
      timing.to > this.numberOfTimeBlocks ||
      inRange.length > 0
    )
      return;

    this.movingTiming.time.from = timing.from;
    this.movingTiming.time.to = timing.to;
  }

  moveTimingToWeekday(weekday: Weekday) {
    if (
      !this.movingTiming ||
      this.movingTiming.time.weekday === weekday ||
      this.movingBy !== 'middle' ||
      this.getInRangeTimings(
        weekday,
        this.movingTiming.time.from,
        this.movingTiming.time.to
      ).length > 0
    )
      return;

    this.movingTiming.time.weekday = weekday;
  }

  viewPlan(timing: Timing) {
    this.modalService.open(ViewPlanComponent, {
      input: { timing },
    });
  }

  removeTiming(timing: Timing) {
    timing.plan.timings = timing.plan.timings.filter((t) => t !== timing);
  }

  removePlan(plan: Plan) {
    this.plans = this.plans.filter((p) => p !== plan);
  }

  // breakpoints
  getBreakpointOffset(breakpoint: Breakpoint) {
    return this.PBC.blockToPixel(breakpoint.position);
  }
}
