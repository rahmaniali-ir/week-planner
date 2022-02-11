import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActiveModal } from 'src/app/modal/services/active-modal.service';
import { Task } from '../../interfaces/task';
import { Color } from '../../models/color';
import { Schedule } from '../../models/schedule';
import { TasksService } from '../../services/tasks.service';
import { capitalize } from '../../utils';

@Component({
  selector: 'view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.sass'],
})
export class ViewTaskComponent implements OnInit {
  @Input() task: Task = {
    id: 0,
    title: '',
    time: new Schedule(),
    subtasks: [],
    color: new Color(),
  };

  @ViewChild('title') titleInput!: ElementRef<HTMLInputElement>;

  constructor(
    private tasksService: TasksService,
    private activeModal: ActiveModal
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.titleInput.nativeElement.focus();
    }, 0);
  }

  get placeholder() {
    return 'Task ' + this.task.id;
  }

  get time() {
    return {
      from: Schedule.unitBlockToMinutes(this.task.time.from),
      to: Schedule.unitBlockToMinutes(this.task.time.to),
      duration: Schedule.unitBlockToMinutes(this.task.time.duration),
    };
  }

  save() {
    this.task.title = capitalize(this.task.title);
    this.activeModal.close(this.task);
  }

  removeTask() {
    this.activeModal.dismiss();
    this.tasksService.removeTask(this.task.id);
  }
}
