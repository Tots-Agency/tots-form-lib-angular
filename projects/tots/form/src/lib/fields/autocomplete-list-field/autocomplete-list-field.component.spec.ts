import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteListFieldComponent } from './autocomplete-list-field.component';

describe('AutocompleteListFieldComponent', () => {
  let component: AutocompleteListFieldComponent;
  let fixture: ComponentFixture<AutocompleteListFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutocompleteListFieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutocompleteListFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
