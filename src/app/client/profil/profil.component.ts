import {  Component } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { UserService } from 'src/app/Services/user.service';
import { Client } from 'src/app/core/models/Client';

@Component({
  selector: 'app-profil',

 
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent  {
 
  public user$!:Observable<Client>;
  constructor( private store:Store<any> , private userservice:UserService ){}


 ngOnInit(): void {
 
   this.store.select('user').subscribe(res =>console.log(res));

   /*this.user$.subscribe((user:Client)=>{
    if(user){
      this.userservice.afficheIdentiteBancaire(user.idUser).subscribe(
        (identiteBnacaire:String)=>{
          console.log(identiteBnacaire);
        },
        (error)=>{
          console.log("Une erreur s'est produite lors de la récupération de l'identité bancaire :", error);
        }
      )
    }
   })*/
}
}

