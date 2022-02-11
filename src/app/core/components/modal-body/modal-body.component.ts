import { Component, Input, OnInit } from '@angular/core';
import { ActiveModal } from 'src/app/modal/services/active-modal.service';
import { IconName } from '../icon/iconPack';

@Component({
  selector: 'modal-body',
  templateUrl: './modal-body.component.html',
  styleUrls: ['./modal-body.component.sass'],
})
export class ModalBodyComponent implements OnInit {
  @Input() header: string = '';
  @Input() icon: IconName | undefined = undefined;

  constructor(private activeModal: ActiveModal) {}

  ngOnInit(): void {}

  public dismiss() {
    this.activeModal.dismiss();
  }
}
