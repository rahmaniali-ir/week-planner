import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.sass'],
})
export class TimelineComponent implements OnInit {
  private planHours = 24;
  public planHoursArray: number[] = [];

  constructor(private tasksService: TasksService) {
    for (let i = 1; i < this.planHours; i++) this.planHoursArray.push(i);
  }

  ngOnInit(): void {}

  public get showCaret() {
    return this.tasksService.showTimelineCaret;
  }

  public get caretOffset() {
    return this.tasksService.timelineCaretOffset;
  }
}
