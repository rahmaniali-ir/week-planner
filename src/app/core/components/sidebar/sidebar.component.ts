import { Component, OnInit, ViewChild } from '@angular/core';
import { Task } from '../../interfaces/task';
import { PlanService } from '../../services/plan.service';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass'],
})
export class SidebarComponent implements OnInit {
  constructor(private tasksService: PlanService) {}

  ngOnInit(): void {}
}
