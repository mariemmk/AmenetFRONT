import {  Component } from '@angular/core';
import {  Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NotificationsService } from 'angular2-notifications';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/Services/user.service';
import { Client } from 'src/app/core/models/Client';
import { selectCurrentUser } from 'src/app/core/models/user.selectors';
import { logout } from 'src/app/store/actions/user.action';
import { userReducer } from 'src/app/store/reducers/user.reducer';
@Component({
  selector: 'app-profil',
  standalone:true,
 
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent  {
 
  public user$!: Observable<Client>;
  constructor(private router:Router , private store:Store<any> , private notifier:NotificationsService , private userservice:UserService ){}


 ngOnInit(): void {
  this.userservice.getCurrentUser()
  this.user$ = this.store.select(selectCurrentUser);
}
}

