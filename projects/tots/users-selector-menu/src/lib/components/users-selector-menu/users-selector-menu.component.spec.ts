import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersSelectorMenuComponent } from './users-selector-menu.component';

describe('UsersSelectorMenuComponent', () => {
  let component: UsersSelectorMenuComponent;
  let fixture: ComponentFixture<UsersSelectorMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersSelectorMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersSelectorMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
