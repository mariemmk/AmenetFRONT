import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoInvestComponent } from './auto-invest.component';

describe('AutoInvestComponent', () => {
  let component: AutoInvestComponent;
  let fixture: ComponentFixture<AutoInvestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AutoInvestComponent]
    });
    fixture = TestBed.createComponent(AutoInvestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
