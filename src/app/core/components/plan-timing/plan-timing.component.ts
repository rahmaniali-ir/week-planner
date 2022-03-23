import {
  Component,
  HostBinding,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import { Color } from '../../models/color';
import { TaskTimePipe } from '../../pipes/task-time.pipe';
import { PlanService } from '../../services/plan.service';
import { MovingAnchor } from '../../types/moving';
import { Timing } from '../../types/plan';

@Component({
  selector: 'plan-timing',
  templateUrl: './plan-timing.component.html',
  styleUrls: ['./plan-timing.component.sass'],
})
export class PlanTimingComponent implements OnInit {
  @Input() timing: Timing | null = null;

  private resizeEdgeSpace = 8;
  hoveringOn: MovingAnchor = 'none';

  constructor(
    private planService: PlanService,
    private taskTime: TaskTimePipe
  ) {}

  ngOnInit(): void {}

  @HostBinding('attr.title')
  get title() {
    const from = this.taskTime.transform(
      this.timing!.time.from * this.planService.eachHourBlockDuration
    );
    const to = this.taskTime.transform(
      this.timing!.time.to * this.planService.eachHourBlockDuration
    );
    const duration = this.taskTime.transform(
      this.timing!.time.duration * this.planService.eachHourBlockDuration
    );

    return `from: ${from}\nto: ${to}\nduration: ${duration}`;
  }

  @HostBinding('style.left')
  get left() {
    if (!this.timing) return 0;

    return this.planService.PBC.blockToPixel(this.timing.time.from) + 'px';
  }

  @HostBinding('style.width')
  get width() {
    return this.durationToPixel + 'px';
  }

  @HostBinding('style.--plan-color')
  get color() {
    return this.timing?.plan.color.hsl || null;
  }

  @HostBinding('style.--dark-color')
  get darkColor() {
    const c = Color.clone(this.timing!.plan.color);
    c.lightness = 10;

    return c.hsl;
  }

  @HostBinding('style.cursor')
  get cursor() {
    if (this.hoveringOn === 'beginning' || this.hoveringOn === 'end')
      return 'ew-resize';

    if (this.planService.isAltKeyDown) return 'alias';

    return null;
  }

  @HostBinding('style.pointer-events')
  get pointerEvents() {
    return this.planService.isMovingTiming ? 'none' : null;
  }

  @HostBinding('attr.hovering')
  get hovering() {
    return this.hoveringOn;
  }

  @HostBinding('attr.moving-anchor')
  get movingAnchor() {
    if (this.planService.currentMovingTiming !== this.timing) return null;

    return this.planService.movingBy;
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    const { offsetX: x } = e;

    if (x < this.resizeEdgeSpace) this.hoveringOn = 'beginning';
    else if (x > this.durationToPixel - this.resizeEdgeSpace)
      this.hoveringOn = 'end';
    else this.hoveringOn = 'middle';
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(e: MouseEvent) {
    const { offsetX: x } = e;

    this.planService.movingBy = this.hoveringOn;
    this.planService.movingTimingAnchor = x;
    this.planService.movingTiming$.next(this.timing);
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave() {
    this.hoveringOn = 'none';
  }

  @HostListener('dblclick', ['$event'])
  onDblClick(e: MouseEvent) {
    e.stopPropagation();
    this.planService.viewPlan(this.timing!);
  }

  get hasName() {
    return !!this.timing?.plan.name;
  }

  get name() {
    if (!this.timing) return '';

    if (this.timing.plan.name) return this.timing.plan.name;

    return 'Plan ' + this.timing.plan.id;
  }

  get icon() {
    return this.timing?.plan.icon;
  }

  get durationToPixel() {
    if (!this.timing) return 0;

    return this.planService.PBC.blockToPixel(this.timing.time.duration);
  }
}
