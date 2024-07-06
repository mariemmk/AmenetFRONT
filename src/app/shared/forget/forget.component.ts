import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { UserService } from 'src/app/Services/user.service';


@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css']
})
export class ForgetComponent implements OnInit {

  verif = false;
  reset = false;
  email! : string;

  constructor (private userService : UserService ,private notifier :NotificationsService) {}

  ngOnInit(): void {
  }

  handleReset(event : boolean){
    this.reset = !this.reset;
    this.verif = !this.verif;
  }

  submitEmail(){
    this.userService.sendEmail(this.email).subscribe();
    this.notifier.info('succes', 'email envoyé',{
      timeOut: 5000,
      animate: 'fromRight',
      position: ['top']
    });
    this.verif = !this.verif;
  }
}
