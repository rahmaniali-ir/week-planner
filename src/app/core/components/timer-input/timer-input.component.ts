import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'timer-input',
  templateUrl: './timer-input.component.html',
  styleUrls: ['./timer-input.component.sass'],
})
export class TimerInputComponent implements OnInit {
  @Input() hour: number = 0;
  @Input() minute: number = 0;

  @Output() hourChange = new EventEmitter<number>();
  @Output() minuteChange = new EventEmitter<number>();
  @Output() onSubmit = new EventEmitter();

  @ViewChild('hourInput') hourInput!: any;
  @ViewChild('minuteInput') minuteInput!: any;

  constructor() {}

  ngOnInit(): void {}

  public updateHour() {
    this.hourChange.emit(Math.min(24, this.hour));
  }

  public updateMinute() {
    this.minuteChange.emit(Math.min(60, this.minute));
  }

  public focusHour(e: KeyboardEvent) {
    if (e.key === 'ArrowLeft') {
      this.hourInput.nativeElement.focus();
      this.hourInput.nativeElement.select();
    }
  }

  public focusMinute(e: KeyboardEvent) {
    if (e.key === 'ArrowRight') {
      this.minuteInput.nativeElement.focus();
      this.minuteInput.nativeElement.select();
    }
  }

  public submit() {
    this.onSubmit.emit();
  }
}
