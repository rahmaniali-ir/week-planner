import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TaskTimePipe } from './pipes/task-time.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimerInputComponent } from './components/timer-input/timer-input.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { PlanComponent } from './components/plan/plan.component';
import { TaskComponent } from './components/task/task.component';
import { IconComponent } from './components/icon/icon.component';
import { ModalModule } from '../modal/modal.module';
import { ViewTaskModalComponent } from './components/view-task-modal/view-task-modal.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { ViewTaskComponent } from './components/view-task/view-task.component';
import { ModalBodyComponent } from './components/modal-body/modal-body.component';
import { ColorPickerComponent } from './components/color-picker/color-picker.component';

@NgModule({
  declarations: [
    SidebarComponent,
    TaskTimePipe,
    TimerInputComponent,
    TimelineComponent,
    PlanComponent,
    TaskComponent,
    IconComponent,
    ViewTaskModalComponent,
    ConfirmModalComponent,
    ViewTaskComponent,
    ModalBodyComponent,
    ColorPickerComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ModalModule],
  exports: [IconComponent, SidebarComponent],
})
export class CoreModule {}
