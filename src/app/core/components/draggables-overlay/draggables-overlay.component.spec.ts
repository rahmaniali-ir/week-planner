import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraggablesOverlayComponent } from './draggables-overlay.component';

describe('DraggablesOverlayComponent', () => {
  let component: DraggablesOverlayComponent;
  let fixture: ComponentFixture<DraggablesOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DraggablesOverlayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DraggablesOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
