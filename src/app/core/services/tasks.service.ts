import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ModalService } from 'src/app/modal/services/modal.service';
import { ConfirmModalComponent } from '../components/confirm-modal/confirm-modal.component';
import { ViewTaskModalComponent } from '../components/view-task-modal/view-task-modal.component';
import { ViewTaskComponent } from '../components/view-task/view-task.component';
import { Edge } from '../interfaces/edge';
import { Task } from '../interfaces/task';
import { Weekday } from '../interfaces/week';
import { Color } from '../models/color';
import { PixelRatio } from '../models/pixelRatio';
import { Schedule } from '../models/schedule';

const TIME_BLOCKS = 24;
const DEFAULT_DURATION = 8;

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  public tasks: Task[] = [];
  public panelUnit: PixelRatio = new PixelRatio(TIME_BLOCKS);

  public mouseX: number = 0;
  public movingTaskOffset: number = 0;
  public movingTaskAnchor: number = 0;
  public movingUnitDifference: number = 0;
  public changingTaskSubject: Subject<Task | null> = new Subject();
  public changingTaskUpdateSubject: Subject<Task | null> = new Subject();
  public changingEdge: Edge = 'none';
  private _isChangingTask: boolean = false;
  private _originalChangingTask: Task | null = null;
  private _changingTask: Task | null = null;

  constructor(private modalService: ModalService) {
    window.addEventListener('mouseup', () => {
      this.changingTaskSubject.next(null);
    });

    this.changingTaskSubject.subscribe((task) => {
      if (task) {
        this._isChangingTask = true;
        this._changingTask = task;
        this._originalChangingTask = { ...task };
        this._originalChangingTask.time = new Schedule(
          this._changingTask.time.weekday,
          this._changingTask.time.from,
          this._changingTask.time.to
        );

        setTimeout(() => {
          this.movingTaskAnchor = this.mouseX;
        }, 0);
      } else {
        this.changingEdge = 'none';
        this._isChangingTask = false;
        this._changingTask = null;
        this.movingTaskOffset = 0;
      }
    });

    this.loadFromLocalStorage();

    window.addEventListener('beforeunload', this.saveToLocalStorage.bind(this));
    window.addEventListener('blur', this.saveToLocalStorage.bind(this));

    // this.viewTask({
    //   id: 0,
    //   title: '',
    //   time: new Schedule(),
    //   subtasks: [],
    //   color: new Color(),
    // });
  }

  public get isChangingTask() {
    return this._isChangingTask;
  }

  public get resizingTask() {
    return this._changingTask;
  }

  private preventLeftOverlap(units: number) {
    if (!this._changingTask || this.changingEdge === 'none') return;

    const nearestLeftSibling = this.getNearestLeftSiblingTask(
      this._changingTask
    );

    if ((nearestLeftSibling && nearestLeftSibling.time.to > units) || units < 0)
      return false;

    return true;
  }

  private preventRightOverlap(units: number) {
    if (!this._changingTask || this.changingEdge === 'none') return;

    const nearestRightSibling = this.getNearestRightSiblingTask(
      this._changingTask
    );

    if (
      (nearestRightSibling && nearestRightSibling.time.from < units) ||
      units > 24 * 4
    )
      return false;

    return true;
  }

  private getTaskIndex(task: Task) {
    return this.tasks.findIndex((t) => t === task);
  }

  private saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  private loadFromLocalStorage() {
    const saved = localStorage.getItem('tasks');
    if (!saved) return;

    try {
      const tasks = JSON.parse(saved) as Task[];

      this.tasks = tasks.map((t) => {
        const { h, s, l } = t.color as any;
        const { weekday, from, to } = t.time;

        return {
          ...t,
          time: new Schedule(weekday, from, to),
          color: new Color(h, s, l),
        };
      });
    } catch (e) {}
  }

  private getNextId() {
    if (!this.tasks.length) return 1;

    const ids = this.tasks.map((t) => t.id).sort((a, b) => a - b);

    const lastId = ids.pop()!;
    return lastId + 1;
  }

  public createTask(weekday: Weekday = 'Saturday', offset: number = 0) {
    const timeBlocks = this.panelUnit.toPerfectUnit(offset);

    const task: Task = {
      id: this.getNextId(),
      title: '',
      subtasks: [],
      time: new Schedule(weekday, timeBlocks, timeBlocks + DEFAULT_DURATION),
      color: Color.random().normalize(),
    };

    if (this.getInRangeTasks(weekday, task.time.from, task.time.to).length > 0)
      return;

    const nearestRightSibling = this.getNearestRightSiblingTask(task);

    if (nearestRightSibling)
      task.time.to = Math.min(nearestRightSibling.time.from, task.time.to);

    if (task.time.duration < DEFAULT_DURATION) {
      const idealFrom = Math.max(0, task.time.to - DEFAULT_DURATION);

      const nearestLeftSibling = this.getInRangeTasks(
        task.time.weekday,
        idealFrom,
        task.time.from
      ).sort((a, b) => (b.time.to < a.time.to ? -1 : 1))?.[0];
      task.time.from = idealFrom;

      if (nearestLeftSibling)
        task.time.from = Math.max(nearestLeftSibling.time.to, task.time.from);
    }

    if (task.time.duration <= 1) return;

    this.tasks.push(task);

    this.changingTaskUpdateSubject.next(task);
  }

  public moveChangingTaskToWeekday(weekday: Weekday) {
    if (!this.isChangingTask || this.changingEdge !== 'center') return;

    const inRange = this.getInRangeTasks(
      weekday,
      this._changingTask!.time.from,
      this._changingTask!.time.to
    ).filter((task) => task.id !== this._changingTask!.id);

    if (inRange.length === 0) this._changingTask!.time.weekday = weekday;
  }

  public getSiblingTasks(task: Task) {
    return this.tasks
      .filter((t) => t.id !== task.id)
      .filter((t) => t.time.weekday === task.time.weekday);
  }

  public getNearestLeftSiblingTask(task: Task) {
    return this.getSiblingTasks(task)
      .filter((t) => t.time.to <= task.time.from)
      .sort((a, b) => (b.time.to > a.time.to ? 1 : -1))?.[0];
  }

  public getNearestRightSiblingTask(task: Task) {
    return this.getSiblingTasks(task)
      .filter((t) => t.time.from >= task.time.from)
      .sort((a, b) => (b.time.to < a.time.to ? 1 : -1))?.[0];
  }

  public getInRangeTasks(weekday: Weekday, from: number, to: number) {
    return this.tasks
      .filter((task) => task.time.weekday === weekday)
      .filter((task) => task.time.to > from && task.time.from < to);
  }

  public updateChangingTask(offset: number = 0) {
    if (!this._changingTask || this.changingEdge === 'none') return;

    const units = this.panelUnit.toPerfectUnit(offset);

    const afterEffect = new Schedule();
    afterEffect.from = this._changingTask.time.from;
    afterEffect.to = this._changingTask.time.to;

    this.changingTaskUpdateSubject.next(this._changingTask);

    if (this.changingEdge === 'left') {
      afterEffect.from = units;

      if (afterEffect.duration < 1) return;

      if (this.preventLeftOverlap(units)) this._changingTask.time.from = units;
      return;
    }

    if (this.changingEdge === 'right') {
      afterEffect.to = units;

      if (afterEffect.duration < 1) return;

      if (this.preventRightOverlap(units)) this._changingTask.time.to = units;
      return;
    }

    if (this.changingEdge === 'center') {
      const delta = this.mouseX - this.movingTaskAnchor;
      const diff = this.panelUnit.toPerfectUnit(delta);

      afterEffect.from = Math.max(
        0,
        this._originalChangingTask!.time.from + diff
      );
      afterEffect.to = Math.min(
        this._originalChangingTask!.time.to + diff,
        24 * 4
      );

      if (afterEffect.duration !== this._originalChangingTask!.time.duration)
        return;

      if (this.preventLeftOverlap(afterEffect.from))
        this._changingTask.time.from = afterEffect.from;

      if (this.preventRightOverlap(afterEffect.to))
        this._changingTask.time.to = afterEffect.to;
    }
  }

  public viewTask(task: Task) {
    const modal = this.modalService.open<Task>(ViewTaskComponent, {
      input: {
        task: { ...task },
      },
    });

    modal.result.subscribe({
      next: (updatedTask) => {
        const i = this.getTaskIndex(task);
        this.tasks[i] = updatedTask!;
      },
      error: () => {},
    });
  }

  public removeTask(id: number) {
    this.tasks = this.tasks.filter((t) => t.id !== id);
  }
}
