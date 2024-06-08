import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ReclamationService } from 'src/app/Services/reclamation.service';
import { UserService } from 'src/app/Services/user.service';
import { Client } from 'src/app/core/models/Client';

import { Reclamation } from 'src/app/core/models/reclamation';
import { selectCurrentUser } from 'src/app/core/models/user.selectors';
import { User } from 'src/app/store/actions/user.action';

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.css']
})
export class ReclamationComponent implements OnInit {

  reclamation:Reclamation = new Reclamation();
  currentUser$: Observable<Client>;

  constructor(private reclamationService:ReclamationService, private store: Store<any>,private userService: UserService){
    this.currentUser$ = this.store.pipe(select(selectCurrentUser));
  }
  ngOnInit(): void {this.userService.getCurrentUser().subscribe(user => {
    this.reclamationService.user$.next(user);
    
  });
    
  }
  
  submitReclamation():void{
    this.currentUser$.subscribe(user => {
      if (user) {
        this.reclamationService.addreclamation(this.reclamation).subscribe(
          response => {
            console.log('Reclamation successful', response);
          },
          error => {
            console.error('Reclamation failed', error);
          }
        );
      } else {
        console.error('No user found');
      }
    });
  }
   
    
  }
