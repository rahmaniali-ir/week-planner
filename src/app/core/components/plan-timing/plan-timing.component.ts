import {
  Component,
  HostBinding,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
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

  constructor(private planService: PlanService) {}

  ngOnInit(): void {}

  @HostBinding('style.left')
  get left() {
    if (!this.timing) return 0;

    return this.planService.PBC.blockToPixel(this.timing.time.from) + 'px';
  }

  @HostBinding('style.width')
  get width() {
    return this.durationToPixel + 'px';
  }

  @HostBinding('style.color')
  get color() {
    return this.timing?.plan.color.hsl || null;
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
    this.planService.viewPlan(this.timing!.plan);
  }

  get name() {
    if (!this.timing) return '';

    if (this.timing.plan.name) return this.timing.plan.name;

    return 'Plan ' + this.timing.plan.id;
  }

  get durationToPixel() {
    if (!this.timing) return 0;

    return this.planService.PBC.blockToPixel(this.timing.time.duration);
  }
}
