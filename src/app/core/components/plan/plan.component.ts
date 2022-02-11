import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Weekday } from '../../interfaces/week';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.sass'],
})
export class PlanComponent implements OnInit {
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

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    const updateUnits = () => {
      this.tasksService.panelUnit.updateTotal(
        this.body.nativeElement.clientWidth
      );
    };

    setTimeout(updateUnits, 0);
    window.addEventListener('resize', updateUnits);
  }

  public get resizingTask() {
    return this.tasksService.resizingTask;
  }

  public get isChanging() {
    return this.tasksService.isChangingTask;
  }

  public weekdayTasks(weekday: Weekday) {
    return this.tasksService.tasks.filter(
      (task) => task.time.weekday === weekday
    );
  }

  public onMouseMove(e: MouseEvent, weekday: Weekday) {
    if (this.isChanging) {
      const { offsetX } = e;
      this.tasksService.mouseX = offsetX;

      this.tasksService.moveChangingTaskToWeekday(weekday);
      this.tasksService.updateChangingTask(offsetX);
    }
  }

  public onDblClick(weekday: Weekday, e: MouseEvent) {
    const { offsetX } = e;
    this.tasksService.createTask(weekday, offsetX);
  }
}
