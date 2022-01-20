import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerInputComponent } from './timer-input.component';

describe('TimerInputComponent', () => {
  let component: TimerInputComponent;
  let fixture: ComponentFixture<TimerInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimerInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimerInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
