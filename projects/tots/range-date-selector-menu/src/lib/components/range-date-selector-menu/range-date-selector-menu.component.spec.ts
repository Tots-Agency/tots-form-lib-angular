import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RangeDateSelectorMenuComponent } from './range-date-selector-menu.component';

describe('RangeDateSelectorMenuComponent', () => {
  let component: RangeDateSelectorMenuComponent;
  let fixture: ComponentFixture<RangeDateSelectorMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RangeDateSelectorMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RangeDateSelectorMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
