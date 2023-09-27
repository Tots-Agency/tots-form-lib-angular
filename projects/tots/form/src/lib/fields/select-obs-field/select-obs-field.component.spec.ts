import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectObsFieldComponent } from './select-obs-field.component';

describe('SelectObsFieldComponent', () => {
  let component: SelectObsFieldComponent;
  let fixture: ComponentFixture<SelectObsFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectObsFieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectObsFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
