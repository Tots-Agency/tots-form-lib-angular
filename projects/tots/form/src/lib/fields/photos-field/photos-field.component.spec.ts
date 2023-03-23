import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotosFieldComponent } from './photos-field.component';

describe('PhotosFieldComponent', () => {
  let component: PhotosFieldComponent;
  let fixture: ComponentFixture<PhotosFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotosFieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotosFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
