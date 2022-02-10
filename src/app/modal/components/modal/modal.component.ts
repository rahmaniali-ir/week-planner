import {
  AfterViewInit,
  Component,
  HostBinding,
  HostListener,
  Injector,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ModalHostDirective } from '../../directives/modal-host.directive';
import { ActiveModal } from '../../services/active-modal.service';
import { ModalRef } from '../../types/modalRef';

@Component({
  selector: 'modal-wrapper',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalComponent implements OnInit, AfterViewInit {
  @Input() content: any;
  @Input() modalRef!: ModalRef;

  @Input()
  @HostBinding('attr.class')
  windowClass: string | null = null;

  @ViewChild(ModalHostDirective, { static: true })
  ModalHost!: ModalHostDirective;

  constructor(private activeModal: ActiveModal) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.loadComponent();
  }

  @HostListener('click', ['$event'])
  public onClickOutside(e: MouseEvent) {
    this.dismiss();
  }

  public close() {
    this.modalRef.close();
  }

  public dismiss() {
    this.modalRef.dismiss();
  }

  public preventDefault(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
  }

  private loadComponent() {
    const viewContainerRef = this.ModalHost.viewContainerRef;
    viewContainerRef.clear();

    const injector = Injector.create({
      providers: [
        {
          provide: ActiveModal,
          useValue: {
            modalRef: this.modalRef,
            close: this.modalRef.close.bind(this.modalRef),
            dismiss: this.modalRef.dismiss.bind(this.modalRef),
          },
        },
      ],
    });

    const componentRef = viewContainerRef.createComponent(this.content, {
      injector: injector,
    });
    // componentRef.instance.data = this.modal.data;
  }
}
