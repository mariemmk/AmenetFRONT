import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, throwError } from 'rxjs';
import { switchMap, tap, catchError } from 'rxjs/operators';
import { Client } from 'src/app/core/models/Client';
import { Credit } from 'src/app/core/models/CreditRequest';
import { selectCurrentUser } from 'src/app/core/models/user.selectors';
import { CreditRequestService } from 'src/app/Services/credit-request.service';
import { currentUser } from 'src/app/store/actions/user.action';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css']
})
export class LoanComponent implements OnInit {
  credits: Credit[] = [];
  currentUser$: Observable<Client>;
  loading: boolean = false;

  constructor(
    private store: Store<any>,
    private creditRequestService: CreditRequestService
  ) {
    this.currentUser$ = this.store.pipe(select(selectCurrentUser));
  }

  ngOnInit(): void {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    const accessToken = localStorage.getItem('accessToken') || '';

    if (storedUser && storedUser.idUser && accessToken) {
      this.store.dispatch(currentUser({ user: storedUser, accessToken }));
    }

    this.currentUser$.pipe(
      switchMap(user => {
        if (user) {
          return this.creditRequestService.getCreditsByUserId(user.idUser);
        } else {
          throw new Error('No current user found');
        }
      }),
      tap(data => this.credits = data),
      catchError(error => {
        console.error('Failed to load credits', error);
        return [];
      })
    ).subscribe();
  }

  deleteCredit(id: number): void {
    this.creditRequestService.deleteCreditRequest(id).pipe(
      switchMap(() => this.currentUser$),
      switchMap(user => {
        if (user) {
          return this.creditRequestService.getCreditsByUserId(user.idUser);
        } else {
          throw new Error('No current user found');
        }
      }),
      tap(data => this.credits = data),
      catchError(error => {
        console.error('Error deleting credit request:', error);
        return throwError(error);
      })
    ).subscribe(
      () => console.log('Credit request deleted and list refreshed'),
      (error) => console.error('Error deleting credit request', error)
    );
  }
  
}
