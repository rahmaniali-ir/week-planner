import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanTimingComponent } from './plan-timing.component';

describe('PlanTimingComponent', () => {
  let component: PlanTimingComponent;
  let fixture: ComponentFixture<PlanTimingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanTimingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanTimingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
