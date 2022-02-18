import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActiveModal } from 'src/app/modal/services/active-modal.service';
import { Task } from '../../interfaces/task';
import { Color } from '../../models/color';
import { Schedule } from '../../models/schedule';
import { PlanService } from '../../services/plan.service';
import { Plan } from '../../types/plan';
import { capitalize } from '../../utils';

@Component({
  selector: 'view-task',
  templateUrl: './view-plan.component.html',
  styleUrls: ['./view-plan.component.sass'],
})
export class ViewPlanComponent implements OnInit {
  @Input() plan: Plan | null = null;
  _title = '';
  _color: Color | null = null;

  constructor(private activeModal: ActiveModal) {}

  ngOnInit(): void {
    this._title = this.plan?.name || '';

    if (this.plan?.color) {
      this._color = new Color();
      this._color.hsl = this.plan.color.hsl;
    }
  }

  get placeholder() {
    return 'Plan ' + this.plan?.id;
  }

  get color() {
    return this.plan?.color;
  }

  colorChanged(color: Color) {
    this._color = color;
  }

  save() {
    if (!this.plan) return;

    this.plan.name = this._title;

    if (this._color) this.plan.color = this._color;

    this.activeModal.close();
  }
}
