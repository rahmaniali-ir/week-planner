import { Component, OnInit } from '@angular/core';
import { PlannedTask } from '../../interfaces/task';
import { Weekday } from '../../interfaces/week';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.sass'],
})
export class PlanComponent implements OnInit {
  public weekdays: Weekday[] = [
    'Saturday',
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Friday',
  ];

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {}

  public get plannedTasks() {
    return this.tasksService.plannedTasks;
  }

  private taskPosition(planned: PlannedTask) {
    const unit = this.tasksService.planHourUnit;

    const start = planned.start * unit;
    const duration = planned.task.duration * unit;

    return {
      start,
      end: start + duration,
    };
  }

  public tasksOfWeekday(weekday: Weekday) {
    return this.plannedTasks
      .filter((task) => task.weekday === weekday)
      .map((planned) => {
        planned['position'] = this.taskPosition(planned);
        return planned;
      });
  }

  public onMouseEnter() {
    this.tasksService.showTimelineCaret = true;
  }

  public onMouseLeave() {
    this.tasksService.showTimelineCaret = false;
  }

  public onMouseMove(e: any) {
    this.tasksService.planHourUnit = (e.target.clientWidth - 1) / (24 * 4);
    this.tasksService.setPlannerHourOffset(e.offsetX);
  }

  public onMouseUp(weekday: Weekday, e: any) {
    console.log(weekday, this.tasksService.draggingTask, e);
  }
}
