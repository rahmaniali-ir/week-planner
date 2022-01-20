import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../../interfaces/task';

@Component({
  selector: 'task-showcase',
  templateUrl: './task-showcase.component.html',
  styleUrls: ['./task-showcase.component.sass'],
})
export class TaskShowcaseComponent implements OnInit {
  @Input() task: Task = {
    id: 0,
    title: '',
    repetition: 0,
    duration: 0,
    color: '#eee',
  };

  constructor() {}

  ngOnInit(): void {}
}
