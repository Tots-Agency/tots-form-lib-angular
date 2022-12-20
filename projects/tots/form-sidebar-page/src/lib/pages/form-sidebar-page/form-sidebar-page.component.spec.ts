import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotsFormSidebarPageComponent } from './form-sidebar-page.component';

describe('FormSidebarPageComponent', () => {
  let component: TotsFormSidebarPageComponent;
  let fixture: ComponentFixture<TotsFormSidebarPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotsFormSidebarPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotsFormSidebarPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
