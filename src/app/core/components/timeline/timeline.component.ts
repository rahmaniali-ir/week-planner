import { Component, OnInit } from '@angular/core';
import { PlanService } from '../../services/plan.service';

@Component({
  selector: 'timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.sass'],
})
export class TimelineComponent implements OnInit {
  private planHours = 24;
  public planHoursArray: number[] = [];

  constructor(private planService: PlanService) {
    for (let i = 1; i <= this.planHours; i++) this.planHoursArray.push(i);
  }

  ngOnInit(): void {}

  private get caretBlockOffset() {
    return this.planService.PBC.pixelToPerfectBlock(
      this.planService.movingTimingOffset
    );
  }

  get isCaretAtBeginning() {
    return this.caretBlockOffset === 0;
  }

  get isCaretAtEnd() {
    return this.caretBlockOffset === this.planService.numberOfTimeBlocks;
  }

  get showCaret() {
    return true;
  }

  get caretOffset() {
    return this.planService.PBC.blockToPixel(this.caretBlockOffset) + 'px';
  }

  get hoveredTime() {
    return this.caretBlockOffset * this.planService.eachHourBlockDuration;
  }

  get hoveredHour() {
    return Math.floor(
      this.caretBlockOffset / this.planService.hourBlockDivider
    );
  }
}
