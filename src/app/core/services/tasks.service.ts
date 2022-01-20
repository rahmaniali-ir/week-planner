import { Injectable } from '@angular/core';
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

  constructor() {}

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
}
