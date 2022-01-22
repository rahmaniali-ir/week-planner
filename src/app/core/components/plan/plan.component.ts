import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.sass'],
})
export class PlanComponent implements OnInit {
  public weekdays: string[] = [
    'Saturday',
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Friday',
  ];

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {}

  public onMouseEnter() {
    this.tasksService.showTimelineCaret = true;
  }

  public onMouseLeave() {
    this.tasksService.showTimelineCaret = false;
  }

  public onMouseMove(e: any) {
    this.tasksService.planHourUnit = e.target.clientWidth / 24;
    this.tasksService.setPlannerHourOffset(e.offsetX);
  }
}
