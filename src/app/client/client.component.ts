import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserService } from '../Services/user.service';
import { Client } from '../core/models/Client';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent {
  public user$!: Client;

  constructor(private router:Router , private store:Store<any> , private userservice:UserService ){}

  ngOnInit(): void {
 
    this.store.select('user').subscribe(res =>this.user$=res.user);
 }
}
