import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TaskTimePipe } from './pipes/task-time.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimerInputComponent } from './components/timer-input/timer-input.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { BoardComponent } from './components/board/board.component';
import { TaskComponent } from './components/task/task.component';
import { IconComponent } from './components/icon/icon.component';
import { ModalModule } from '../modal/modal.module';
import { ViewTaskModalComponent } from './components/view-task-modal/view-task-modal.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { ViewPlanComponent } from './components/view-plan/view-plan.component';
import { ModalBodyComponent } from './components/modal-body/modal-body.component';
import { ColorPickerComponent } from './components/color-picker/color-picker.component';
import { PlanTimingComponent } from './components/plan-timing/plan-timing.component';
import { IconPickerComponent } from './components/icon-picker/icon-picker.component';

@NgModule({
  declarations: [
    SidebarComponent,
    TaskTimePipe,
    TimerInputComponent,
    TimelineComponent,
    BoardComponent,
    TaskComponent,
    IconComponent,
    ViewTaskModalComponent,
    ConfirmModalComponent,
    ViewPlanComponent,
    ModalBodyComponent,
    ColorPickerComponent,
    PlanTimingComponent,
    IconPickerComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ModalModule],
  exports: [IconComponent, SidebarComponent],
  providers: [TaskTimePipe],
})
export class CoreModule {}
