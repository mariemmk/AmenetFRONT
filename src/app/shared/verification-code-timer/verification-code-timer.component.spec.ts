import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationCodeTimerComponent } from './verification-code-timer.component';

describe('VerificationCodeTimerComponent', () => {
  let component: VerificationCodeTimerComponent;
  let fixture: ComponentFixture<VerificationCodeTimerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerificationCodeTimerComponent]
    });
    fixture = TestBed.createComponent(VerificationCodeTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
