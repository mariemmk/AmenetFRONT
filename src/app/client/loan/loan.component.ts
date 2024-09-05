import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap, tap, catchError } from 'rxjs/operators';
import { Client } from 'src/app/core/models/Client';
import { Credit } from 'src/app/core/models/CreditRequest';
import { selectCurrentUser } from 'src/app/core/models/user.selectors';
import { CreditRequestService } from 'src/app/Services/credit-request.service';
import { currentUser } from 'src/app/store/actions/user.action';
import { AmortizationEntry } from 'src/app/core/models/AmortizationEntry'; // Adjust path as needed
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css']
})
export class LoanComponent implements OnInit {
  credits: Credit[] = [];
  currentUser$: Observable<Client>;
  loading: boolean = false;
  selectedCreditId: number | null = null;
  amortizationEntries: AmortizationEntry[] = [];

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
        return of([]);
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
        console.error('Error deleting credit request', error);
        return of([]);
      })
    ).subscribe();
  }

  showAmortizationSchedule(creditId: number): void {
    this.selectedCreditId = creditId;
    this.creditRequestService.getAmortizationEntriesByCreditId(creditId).subscribe(
      (entries) => {
        this.amortizationEntries = entries;
        const modalElement = document.getElementById('amortizationScheduleModal') as HTMLElement;
        if (modalElement) {
          const modal = new bootstrap.Modal(modalElement);
          modal.show();
        } else {
          console.error('Modal element not found');
        }
      },
      (err) => {
        console.error('Error fetching amortization entries', err);
      }
    );
  }

}
