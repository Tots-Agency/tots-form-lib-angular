import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonacoEditorFieldComponent } from './monaco-editor-field.component';

describe('MonacoEditorFieldComponent', () => {
  let component: MonacoEditorFieldComponent;
  let fixture: ComponentFixture<MonacoEditorFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonacoEditorFieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonacoEditorFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
