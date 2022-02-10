import { ApplicationRef, ComponentRef, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ModalComponent } from '../components/modal/modal.component';

export type ModalRefType = ComponentRef<ModalComponent>;

export class ModalRef<T = any> {
  private component: any;
  private modalRef: ModalRefType;
  private appRef: ApplicationRef;
  public result: Subject<T | null> = new Subject<T | null>();

  constructor(appRef: ApplicationRef, modalRef: ModalRefType, component: any) {
    this.appRef = appRef;
    this.modalRef = modalRef;
    this.component = component;
  }

  public close(data: T | null = null) {
    this.result.next(data);
    this.destroy();
  }

  public dismiss(data: T | null = null) {
    this.result.error(data);
    this.destroy();
  }

  private destroy() {
    this.result.complete();

    this.appRef.detachView(this.modalRef.hostView);
    this.modalRef.destroy();
  }
}
