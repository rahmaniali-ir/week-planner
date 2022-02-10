import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector,
} from '@angular/core';
import { ModalComponent } from '../components/modal/modal.component';
import { ModalRef } from '../types/modalRef';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modals: ModalRef[] = [];

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  public open<T = any>(component: any) {
    const componentRef = this.appendToView(component);
    componentRef.instance.windowClass = 'test';

    const ref = new ModalRef<T>(this.appRef, componentRef, component);
    componentRef.instance.modalRef = ref;

    this.modals.push(ref);
    return ref;
  }

  private appendToView(component: any) {
    const componentRef = this.componentFactoryResolver
      .resolveComponentFactory(ModalComponent)
      .create(this.injector);

    componentRef.instance.content = component;

    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    document.body.appendChild(domElem);

    return componentRef;
  }
}
