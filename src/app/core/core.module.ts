import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskShowcaseComponent } from './components/task-showcase/task-showcase.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TaskTimePipe } from './pipes/task-time.pipe';
import { FormsModule } from '@angular/forms';
import { TimerInputComponent } from './components/timer-input/timer-input.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { PlanComponent } from './components/plan/plan.component';
import { DraggableDirective } from './directives/draggable.directive';
import { DraggablesOverlayComponent } from './components/draggables-overlay/draggables-overlay.component';
import { TaskComponent } from './components/task/task.component';

@NgModule({
  declarations: [
    TaskShowcaseComponent,
    SidebarComponent,
    TaskTimePipe,
    TimerInputComponent,
    TimelineComponent,
    PlanComponent,
    DraggableDirective,
    DraggablesOverlayComponent,
    TaskComponent,
  ],
  imports: [CommonModule, FormsModule],
  exports: [SidebarComponent, DraggablesOverlayComponent],
})
export class CoreModule {}
