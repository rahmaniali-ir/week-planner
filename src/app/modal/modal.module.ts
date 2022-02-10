import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalHostDirective } from './directives/modal-host.directive';
import { ModalComponent } from './components/modal/modal.component';
import { ModalService } from './services/modal.service';

@NgModule({
  declarations: [ModalHostDirective, ModalComponent],
  imports: [CommonModule],
  exports: [],
  providers: [ModalService],
})
export class ModalModule {}
