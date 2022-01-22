import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Task } from '../interfaces/task';
import { Color } from '../models/color';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  public tasks: Task[] = [
    {
      id: 1,
      title: 'Task 1',
      repetition: 3,
      duration: 60,
      color: '#2abc62',
    },
    {
      id: 2,
      title: 'Task 2',
      repetition: 4,
      duration: 30,
      color: '#eb4a62',
    },
    {
      id: 3,
      title: 'Task 3',
      repetition: 5,
      duration: 15,
      color: '#784ee0',
    },
  ];

  public planHourUnit: number = 0;
  public hoveringPlanHour: number = 0;
  public showTimelineCaret: boolean = false;

  // drag feature
  public draggingTask: Task | null = null;
  public dragging: Subject<MouseEvent | null> = new Subject();

  constructor() {
    // mouse move
    window.addEventListener('mousemove', (e) => {
      if (this.draggingTask) this.dragging.next(e);
    });

    // mouse up
    window.addEventListener('mouseup', () => {
      this.draggingTask = null;
      this.dragging.next(null);
    });
  }

  public get timelineCaretOffset() {
    return this.planHourUnit * this.hoveringPlanHour;
  }

  public addNewTask(title: string, duration: number) {
    if (!title) throw new Error("Task title can't be empty!");

    this.tasks.push({
      id: 4,
      title: title.trim(),
      duration,
      repetition: 0,
      color: Color.random(),
    });
  }

  public setPlannerHourOffset(offset: number = 0) {
    this.hoveringPlanHour = Math.floor(offset / this.planHourUnit);
  }
}
