import { Component, OnInit, ViewChild } from '@angular/core';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass'],
})
export class SidebarComponent implements OnInit {
  public newTaskTitle = '';
  public newTaskHour = 0;
  public newTaskMinute = 0;

  @ViewChild('newTaskTitleInput') newTaskTitleInput!: any;

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {}

  public get tasks() {
    return this.tasksService.tasks;
  }

  public addNewTask() {
    if (this.newTaskTitle.length === 0) return;

    const duration = this.newTaskHour * 60 + this.newTaskMinute;

    this.tasksService.addNewTask(this.newTaskTitle, duration);
    this.newTaskTitle = '';
    this.newTaskHour = this.newTaskMinute = 0;
    this.newTaskTitleInput.nativeElement.focus();
  }
}
