import { Component, OnInit } from '@angular/core';
import { ActiveModal } from 'src/app/modal/services/active-modal.service';

@Component({
  selector: 'view-task-modal',
  templateUrl: './view-task-modal.component.html',
  styleUrls: ['./view-task-modal.component.sass'],
})
export class ViewTaskModalComponent implements OnInit {
  constructor(private activeModal: ActiveModal) {
    setTimeout(() => {
      console.log(this.activeModal.modalRef);
    }, 4000);
  }

  ngOnInit(): void {}

  public onClose() {
    this.activeModal.close('Closed');
  }

  public onDismiss() {
    this.activeModal.dismiss('Dismissed');
  }
}
