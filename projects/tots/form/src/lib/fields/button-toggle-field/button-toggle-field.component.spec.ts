import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonToggleFieldComponent } from './button-toggle-field.component';

describe('ButtonToggleFieldComponent', () => {
  let component: ButtonToggleFieldComponent;
  let fixture: ComponentFixture<ButtonToggleFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonToggleFieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonToggleFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
