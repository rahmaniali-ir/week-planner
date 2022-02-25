import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { PlanService } from '../../services/plan.service';
import { ActionsButtonItem } from './action-button-item';

@Component({
  selector: 'actions-button',
  templateUrl: './actions-button.component.html',
  styleUrls: ['./actions-button.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class ActionsButtonComponent implements OnDestroy {
  @Input() open = false;
  @Output() openChange: EventEmitter<boolean> = new EventEmitter();

  @Input() actions: ActionsButtonItem[] = [];
  @Output() onSelect: EventEmitter<ActionsButtonItem> = new EventEmitter();

  private clickSubscription$: Subscription;

  constructor(
    private planService: PlanService,
    private el: ElementRef<HTMLElement>
  ) {
    this.clickSubscription$ = this.planService.click$.subscribe((e) => {
      const target = e.target as HTMLElement;
      if (
        target.closest('actions-button') !== this.el.nativeElement &&
        this.open
      )
        this.toggleOpen();
    });
  }

  ngOnDestroy(): void {
    this.clickSubscription$.unsubscribe();
  }

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
