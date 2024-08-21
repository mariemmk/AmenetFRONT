// src/app/components/reclamation/reclamation.component.ts
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ReclamationService } from 'src/app/Services/reclamation.service';
import { Client } from 'src/app/core/models/Client';
import { Reclamation } from 'src/app/core/models/reclamation';
import { selectCurrentUser } from 'src/app/core/models/user.selectors';
import { currentUser } from 'src/app/store/actions/user.action';

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.css']
})
export class ReclamationComponent implements OnInit {

  reclamation: Reclamation = {
    reclamationId: 0,
    date: new Date(), // Initialize date
    contenu: '',
    typeReclamation: '',
    user: null,
    status: ''
  };

  currentUser$: Observable<Client>;

  constructor(private reclamationService: ReclamationService, private store: Store<any>) {
    this.currentUser$ = this.store.pipe(select(selectCurrentUser));
  }

  ngOnInit(): void {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    const accessToken = localStorage.getItem('accessToken') || '';

    if (storedUser && storedUser.idUser && accessToken) {
      this.store.dispatch(currentUser({ user: storedUser, accessToken }));
      this.reclamationService.user$.next(storedUser); // Update user$ with the stored user
    }

    this.currentUser$.subscribe(user => {
      if (user) {
        this.reclamation.user = user;
        console.log('Current User:', user);
      } else {
        console.error('No current user found');
      }
    });
  }

  submitReclamation(): void {
    this.reclamationService.user$.subscribe(user => {
      if (user) {
        this.reclamation.date = new Date(); // Ensure the date is set
        this.reclamation.user=user;

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
