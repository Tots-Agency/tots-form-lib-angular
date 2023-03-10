import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaySelectorMenuComponent } from './day-selector-menu.component';

describe('DaySelectorMenuComponent', () => {
  let component: DaySelectorMenuComponent;
  let fixture: ComponentFixture<DaySelectorMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DaySelectorMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DaySelectorMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
