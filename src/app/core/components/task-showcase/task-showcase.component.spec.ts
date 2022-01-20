import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskShowcaseComponent } from './task-showcase.component';

describe('TaskShowcaseComponent', () => {
  let component: TaskShowcaseComponent;
  let fixture: ComponentFixture<TaskShowcaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskShowcaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
