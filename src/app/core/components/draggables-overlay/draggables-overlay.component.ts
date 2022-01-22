import { Component, HostBinding, OnInit } from '@angular/core';
import { Draggable } from '../../interfaces/dragable';
import { Task } from '../../interfaces/task';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'draggables-overlay',
  templateUrl: './draggables-overlay.component.html',
  styleUrls: ['./draggables-overlay.component.sass'],
})
export class DraggablesOverlayComponent implements OnInit {
  public draggingTask: Draggable<Task | null> = { body: null };
  public draggableOut: boolean = false;

  constructor(private tasksService: TasksService) {
    this.tasksService.dragging.subscribe((dragged) => {
      if (dragged) {
        this.draggingTask = {
          body: this.tasksService.draggingTask,
          event: dragged,
        };
      } else {
        this.draggableOut = true;

        setTimeout(() => {
          this.draggingTask = { body: null };
          this.draggableOut = false;
        }, 300);
      }
    });
  }

  ngOnInit(): void {}

  @HostBinding('class.dragging')
  public get isDragging() {
    return !!this.draggingTask.body;
  }

  public get position() {
    if (!this.draggingTask.event) return null;

    const { pageX, pageY } = this.draggingTask.event;

    const x = pageX - 20;
    const y = pageY - 20;

    return { top: y + 'px', left: x + 'px' };
  }
}
