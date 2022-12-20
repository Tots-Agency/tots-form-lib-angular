import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelHtmlFieldComponent } from './label-html-field.component';

describe('LabelHtmlFieldComponent', () => {
  let component: LabelHtmlFieldComponent;
  let fixture: ComponentFixture<LabelHtmlFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabelHtmlFieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabelHtmlFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
