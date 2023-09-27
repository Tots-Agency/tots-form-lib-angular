import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentionHtmlFieldComponent } from './mention-html-field.component';

describe('MentionHtmlFieldComponent', () => {
  let component: MentionHtmlFieldComponent;
  let fixture: ComponentFixture<MentionHtmlFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MentionHtmlFieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MentionHtmlFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
