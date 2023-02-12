import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesListFieldComponent } from './files-list-field.component';

describe('FilesListFieldComponent', () => {
  let component: FilesListFieldComponent;
  let fixture: ComponentFixture<FilesListFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilesListFieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilesListFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
