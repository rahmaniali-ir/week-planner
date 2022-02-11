import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import { Edge } from '../../interfaces/edge';
import { Task } from '../../interfaces/task';
import { Color } from '../../models/color';
import { Schedule } from '../../models/schedule';
import { TasksService } from '../../services/tasks.service';

type TaskSize = 'large' | 'medium' | 'normal' | 'small' | 'tiny' | 'narrow';

@Component({
  selector: 'task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.sass'],
})
export class TaskComponent implements OnInit {
  private holdingEdge: Edge = 'none';
  private _size: TaskSize = 'normal';

  @Input() task: Task = {
    id: 0,
    title: '',
    time: new Schedule(),
    subtasks: [],
    color: new Color(),
  };

  constructor(
    private tasksService: TasksService,
    private el: ElementRef<HTMLElement>
  ) {}

  ngOnInit(): void {
    this.tasksService.changingTaskUpdateSubject.subscribe(() => {
      this._size = this.getSize();
    });

    setTimeout(() => {
      this._size = this.getSize();
    }, 0);
  }

  @HostBinding('class.changing')
  public get isChanging() {
    return this.tasksService.isChangingTask;
  }

  @HostBinding('style.left')
  public get left() {
    return this.tasksService.panelUnit.fromUnit(this.task.time.from) + 'px';
  }

  @HostBinding('style.width')
  public get width() {
    return this.tasksService.panelUnit.fromUnit(this.task.time.duration) + 'px';
  }

  @HostBinding('style.cursor')
  public get cursor() {
    return this.holdingEdge == 'left' ||
      this.holdingEdge == 'right' ||
      this.isChanging
      ? 'ew-resize'
      : null;
  }

  @HostBinding('attr.size')
  public get size(): TaskSize {
    return this._size;
  }

  @HostListener('mousemove', ['$event'])
  private onMouseMove(e: MouseEvent) {
    const { offsetX } = e;

    if (offsetX < 8) this.holdingEdge = 'left';
    else if (offsetX > this.elementWidth - 8) this.holdingEdge = 'right';
    else this.holdingEdge = 'center';
  }

  @HostListener('mouseleave', ['$event'])
  private onMouseLeave(e: MouseEvent) {
    this.holdingEdge = 'none';
  }

  @HostListener('mousedown', ['$event'])
  private onMouseDown(e: MouseEvent) {
    if (e.button > 0) return;

    if (this.holdingEdge !== 'none') {
      this.tasksService.changingEdge = this.holdingEdge;
      this.tasksService.changingTaskSubject.next(this.task);

      if (this.holdingEdge === 'center') {
        this.tasksService.mouseX = e.offsetX + this.el.nativeElement.offsetLeft;
        this.tasksService.movingTaskOffset = e.offsetX;
      }
    }
  }

  @HostListener('dblclick', ['$event'])
  private onDblClick(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    this.tasksService.viewTask(this.task);
  }

  public get elementWidth() {
    return this.el.nativeElement.clientWidth || 0;
  }

  public get id() {
    return this.task.id;
  }

  public get title() {
    return this.task.title;
  }

  public get time() {
    return {
      from: Schedule.unitBlockToMinutes(this.task.time.from),
      to: Schedule.unitBlockToMinutes(this.task.time.to),
      duration: Schedule.unitBlockToMinutes(this.task.time.duration),
    };
  }

  public get color() {
    return this.task.color || '#eee';
  }

  public getSize(): TaskSize {
    const width = this.elementWidth;

    if (width > 300) return 'large';
    if (width > 190) return 'medium';
    if (width > 80) return 'small';
    if (width > 25) return 'tiny';

    return 'narrow';
  }
}
