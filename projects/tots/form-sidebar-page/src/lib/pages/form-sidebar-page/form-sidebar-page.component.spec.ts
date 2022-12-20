import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSidebarPageComponent } from './form-sidebar-page.component';

describe('FormSidebarPageComponent', () => {
  let component: FormSidebarPageComponent;
  let fixture: ComponentFixture<FormSidebarPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSidebarPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormSidebarPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
