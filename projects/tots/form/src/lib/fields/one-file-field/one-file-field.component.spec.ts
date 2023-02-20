import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneFileFieldComponent } from './one-file-field.component';

describe('OneFileFieldComponent', () => {
  let component: OneFileFieldComponent;
  let fixture: ComponentFixture<OneFileFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneFileFieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OneFileFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
