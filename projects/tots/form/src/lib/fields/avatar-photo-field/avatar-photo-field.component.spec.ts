import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarPhotoFieldComponent } from './avatar-photo-field.component';

describe('AvatarPhotoFieldComponent', () => {
  let component: AvatarPhotoFieldComponent;
  let fixture: ComponentFixture<AvatarPhotoFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvatarPhotoFieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvatarPhotoFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
