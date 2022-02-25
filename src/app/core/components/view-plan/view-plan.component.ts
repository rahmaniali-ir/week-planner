import {
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActiveModal } from 'src/app/modal/services/active-modal.service';
import { Task } from '../../interfaces/task';
import { Color } from '../../models/color';
import { Schedule } from '../../models/schedule';
import { PlanService } from '../../services/plan.service';
import { Plan, Timing } from '../../types/plan';
import { capitalize } from '../../utils';
import { ActionsButtonItem } from '../actions-button/action-button-item';

type ActionType = 'removeTiming' | 'removePlan';

@Component({
  selector: 'view-plan',
  templateUrl: './view-plan.component.html',
  styleUrls: ['./view-plan.component.sass'],
})
export class ViewPlanComponent implements OnInit {
  @Input() timing: Timing | null = null;

  @ViewChild('title') titleInput!: ElementRef<HTMLInputElement>;

  actions: ActionsButtonItem<ActionType>[] = [
    {
      title: 'Remove This timing',
      value: 'removeTiming',
      icon: 'trash',
      customClass: 'hover-warning-color-icon',
    },
    {
      title: 'Remove Plan',
      value: 'removePlan',
      icon: 'trash',
      customClass: 'danger-color-icon hover-danger-color-text',
    },
  ];

  _title = '';
  _color: Color | null = null;

  constructor(
    private activeModal: ActiveModal,
    private planService: PlanService
  ) {}

  ngOnInit(): void {
    this._title = this.plan?.name || '';

    if (this.plan?.color) {
      this._color = new Color();
      this._color.hsl = this.plan.color.hsl;
    }

    setTimeout(() => {
      this.titleInput.nativeElement.focus();
    }, 0);
  }

  @HostBinding('style.--plan-color')
  get color() {
    return this.plan.color.hsl;
  }

  @HostBinding('style.--dark-color')
  get colorDark() {
    const color = Color.clone(this.plan.color);
    color.lightness = 40;

    return color.hsl;
  }

  get blockDuration() {
    return this.planService.eachHourBlockDuration;
  }

  get plan() {
    return this.timing!.plan;
  }

  get planTimings() {
    return this.plan.timings;
  }

  get weeklyTiming() {
    let weekly = 0;

    this.planTimings.forEach((t) => {
      weekly += t.time.duration;
    });

    return weekly;
  }

  get placeholder() {
    return 'Plan ' + this.plan?.id;
  }

  colorChanged(color: Color) {
    this._color = color;
  }

  dismiss() {
    this.activeModal.dismiss();
  }

  save() {
    if (!this.plan) return;

    this.plan.name = this._title;

    if (this._color) this.plan.color = this._color;

    this.activeModal.close();
  }

  removeTiming() {
    this.planService.removeTiming(this.timing!);
    this.activeModal.close();
  }

  removePlan() {
    this.planService.removePlan(this.timing!.plan);
    this.activeModal.close();
  }

  onAction(action: ActionsButtonItem<ActionType>) {
    switch (action.value) {
      case 'removeTiming':
        return this.removeTiming();

      case 'removePlan':
        return this.removePlan();
    }
  }
}
