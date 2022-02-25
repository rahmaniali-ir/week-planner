import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { ActionsButtonItem } from './action-button-item';

@Component({
  selector: 'actions-button',
  templateUrl: './actions-button.component.html',
  styleUrls: ['./actions-button.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class ActionsButtonComponent {
  @Input() open = false;
  @Output() openChange: EventEmitter<boolean> = new EventEmitter();

  @Input() actions: ActionsButtonItem[] = [];
  @Output() onSelect: EventEmitter<ActionsButtonItem> = new EventEmitter();

  get isEmpty() {
    return this.actions.length === 0;
  }

  toggleOpen() {
    this.open = !this.open;
    this.openChange.emit(this.open);
  }

  selectAction(action: ActionsButtonItem) {
    this.onSelect.emit(action);
    this.toggleOpen();
  }
}
