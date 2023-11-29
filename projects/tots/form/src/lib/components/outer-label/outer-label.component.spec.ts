import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotsOuterLabelComponent } from './outer-label.component';

describe('TotsFormComponent', () => {
  let component: TotsOuterLabelComponent;
  let fixture: ComponentFixture<TotsOuterLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotsOuterLabelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotsOuterLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
