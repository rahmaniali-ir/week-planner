import { Component, OnInit } from '@angular/core';
import { ActiveModal } from 'src/app/modal/services/active-modal.service';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.sass'],
})
export class ConfirmModalComponent implements OnInit {
  constructor(private activeModal: ActiveModal) {
    setTimeout(() => {
      this.activeModal.close();
    }, 8000);
  }

  ngOnInit(): void {}
}
