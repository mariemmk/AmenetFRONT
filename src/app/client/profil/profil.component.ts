import {  Component } from '@angular/core';
import {  Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NotificationsService } from 'angular2-notifications';
import { logout } from 'src/app/store/actions/user.action';
@Component({
  selector: 'app-profil',
  standalone:true,
 
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent  {

  constructor(private router:Router , private store:Store<any> , private notifier:NotificationsService){}



  toTransaction(){
    this.router.navigateByUrl("transaction")
  }

  logout(){
    this.store.dispatch(logout());
    this.notifier.error('Deconnexion', 'vous avez deconnecté  ',{
      timeOut: 5000,
      animate: 'fromRight',
      position: ['centered-notification']
    });
  }


}
