import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountRequestListComponent } from './account-request-list.component';

describe('AccountRequestListComponent', () => {
  let component: AccountRequestListComponent;
  let fixture: ComponentFixture<AccountRequestListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountRequestListComponent]
    });
    fixture = TestBed.createComponent(AccountRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
