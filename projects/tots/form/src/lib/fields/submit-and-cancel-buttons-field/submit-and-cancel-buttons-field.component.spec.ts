import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitAndCancelButtonsFieldComponent } from './submit-and-cancel-buttons-field.component';

describe('SubmitAndCancelButtonsFieldComponent', () => {
  let component: SubmitAndCancelButtonsFieldComponent;
  let fixture: ComponentFixture<SubmitAndCancelButtonsFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitAndCancelButtonsFieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmitAndCancelButtonsFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
