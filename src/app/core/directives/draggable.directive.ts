import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { Task } from '../interfaces/task';
import { TasksService } from '../services/tasks.service';

@Directive({
  selector: '[draggable]',
})
export class DraggableDirective {
  @Input() draggable!: Task;
  @Output() isDragging: EventEmitter<MouseEvent | null> = new EventEmitter();

  constructor(private taskService: TasksService) {}

  @HostListener('mousedown')
  private onMouseDown() {
    this.taskService.draggingTask = this.draggable;
  }
}
