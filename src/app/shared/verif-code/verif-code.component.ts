import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { UserService } from 'src/app/Services/user.service';


@Component({
  selector: 'app-verif-code',
  templateUrl: './verif-code.component.html',
  styleUrls: ['./verif-code.component.css']
})
export class VerifCodeComponent implements OnInit {

  @Input() email! : string;
  @Output() resetEmitter : EventEmitter<boolean> = new EventEmitter<boolean>()

  buttonMessage!: string;
  timer : boolean = true;
  notification = false;
  @ViewChild('digit1InputRef') digit1InputRef!: ElementRef;
  @ViewChild('digit2InputRef') digit2InputRef!: ElementRef;
  @ViewChild('digit3InputRef') digit3InputRef!: ElementRef;
  @ViewChild('digit4InputRef') digit4InputRef!: ElementRef;
  @ViewChild('digit5InputRef') digit5InputRef!: ElementRef;
  @ViewChild('digit6InputRef') digit6InputRef!: ElementRef;

  digit1: string = '';
  digit2: string = '';
  digit3: string = '';
  digit4: string = '';
  digit5: string = '';
  digit6: string = '';

  constructor(private userService : UserService ,private notifier : NotificationsService) {}

  ngAfterViewInit() {
    this.digit1InputRef.nativeElement.focus();
  }

  onSubmit() {
    const code = this.digit1 + this.digit2 + this.digit3 + this.digit4+this.digit5+this.digit6;
    this.userService.verifyCode(code, this.email).subscribe(
      result => {
        if(result){
          this.resetEmitter.emit(true);
          this.notifier.info('succes', 'code valide',{
            timeOut: 5000});
        }else{
          this.notifier.error('erreur', 'code invalide',{
            timeOut: 5000});
          this.notification = !this.notification;
          setTimeout(() => this.notification = !this.notification,2000);
        }
      }
    );
  }

  moveToNext(event: Event, nextInput: HTMLInputElement) {
    const input = event.target as HTMLInputElement;
    if (input.value.length === 1) {
      nextInput.focus();
    }
  }

  ngOnInit(): void {
  }

  handleTimer(event : boolean){
    this.timer = !this.timer;
  }

  resendEmail(){
    this.userService.sendEmail(this.email).subscribe();
    this.timer = !this.timer;
  }
}
