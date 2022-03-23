import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import { Edge } from '../../interfaces/edge';
import { Scheduled, Task, Topic } from '../../interfaces/task';
import { Color } from '../../models/color';
import { Schedule } from '../../models/schedule';
import { PlanService } from '../../services/plan.service';

type TaskSize = 'large' | 'medium' | 'normal' | 'small' | 'tiny' | 'narrow';

@Component({
  selector: 'task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.sass'],
})
export class TaskComponent implements OnInit {
  @Input() topic: Scheduled | null = null;

  ngOnInit(): void {}
}
