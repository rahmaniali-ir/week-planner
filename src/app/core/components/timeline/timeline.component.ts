import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.sass'],
})
export class TimelineComponent implements OnInit {
  private planHours = 24;
  public planHoursArray: number[] = [];

  constructor() {
    for (let i = 0; i <= this.planHours; i++) this.planHoursArray.push(i);
  }

  ngOnInit(): void {}
}
