import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TaskTimePipe } from './pipes/task-time.pipe';
import { FormsModule } from '@angular/forms';
import { TimerInputComponent } from './components/timer-input/timer-input.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { PlanComponent } from './components/plan/plan.component';
import { TaskComponent } from './components/task/task.component';
import { IconComponent } from './components/icon/icon.component';

@NgModule({
  declarations: [
    SidebarComponent,
    TaskTimePipe,
    TimerInputComponent,
    TimelineComponent,
    PlanComponent,
    TaskComponent,
    IconComponent,
  ],
  imports: [CommonModule, FormsModule],
  exports: [IconComponent, SidebarComponent],
})
export class CoreModule {}
