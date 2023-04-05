import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatepickerAndTimeEndFieldComponent } from './datepicker-and-time-end-field.component';

describe('DatepickerAndTimeEndFieldComponent', () => {
  let component: DatepickerAndTimeEndFieldComponent;
  let fixture: ComponentFixture<DatepickerAndTimeEndFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatepickerAndTimeEndFieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatepickerAndTimeEndFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
