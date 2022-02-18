import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPlanComponent } from './view-plan.component';

describe('ViewTaskComponent', () => {
  let component: ViewPlanComponent;
  let fixture: ComponentFixture<ViewPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewPlanComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
