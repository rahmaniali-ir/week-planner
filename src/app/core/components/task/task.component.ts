import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Task } from '../../interfaces/task';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.sass'],
})
export class TaskComponent implements OnInit {
  @Input() task: Task = {
    id: 0,
    title: '',
    repetition: 0,
    duration: 0,
    color: '#eee',
  };

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {}

  public get title() {
    return this.task.title || '';
  }

  public get repetition() {
    return this.task.repetition || 0;
  }

  public get duration() {
    return this.task.duration || 0;
  }

  public get color() {
    return this.task.color || '#eee';
  }

  @HostListener('mousemove', ['$event'])
  @HostListener('mouseenter', ['$event'])
  private onMouseEnter(e: MouseEvent) {
    e.stopPropagation();
  }
}
