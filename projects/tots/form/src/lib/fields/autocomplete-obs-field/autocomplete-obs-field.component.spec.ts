import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteObsFieldComponent } from './autocomplete-obs-field.component';

describe('AutocompleteObsFieldComponent', () => {
  let component: AutocompleteObsFieldComponent;
  let fixture: ComponentFixture<AutocompleteObsFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutocompleteObsFieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutocompleteObsFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
