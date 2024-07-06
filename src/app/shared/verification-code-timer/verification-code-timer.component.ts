import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-verification-code-timer',
  templateUrl: './verification-code-timer.component.html',
  styleUrls: ['./verification-code-timer.component.css']
})
export class VerificationCodeTimerComponent implements OnInit {
  countdownValue: number = 10; // Initial countdown value in seconds
  animationDuration: string = `${this.countdownValue}s`; // Set animation duration
  @Output() timerEndEmitter : EventEmitter<boolean> = new EventEmitter<boolean>() 

  constructor() { }

  ngOnInit() {
    this.startTimer();
    setTimeout(() => {
      this.timerEndEmitter.emit(true);
    }, 1000*this.countdownValue)
  }

  startTimer() {
    const countdownInterval = setInterval(() => {
      if (this.countdownValue <= 0) {
        clearInterval(countdownInterval);
        this.countdownValue = 0;
      } else {
        this.countdownValue--;
      }
    }, 1000);
  }
}