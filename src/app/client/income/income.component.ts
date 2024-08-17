import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { GestionBudgetService } from 'src/app/Services/gestion-budget.service';
import { Client } from 'src/app/core/models/Client';
import { Income } from 'src/app/core/models/Incomes';
import { Store, select } from '@ngrx/store';
import { selectCurrentUser } from 'src/app/core/models/user.selectors';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit {
  incomeForm: FormGroup;
  @Output() incomeSubmitted = new EventEmitter<void>();
  currentUser$: Observable<Client | null> = this.store.pipe(select(selectCurrentUser));

  constructor(
    private fb: FormBuilder,
    private gestionBudgetService: GestionBudgetService,
    private store: Store<any>
  ) {
    this.incomeForm = this.fb.group({
      category: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
      date: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.currentUser$.subscribe(user => {
      if (user) {
        console.log('Current User:', user);
      } else {
        console.error('No current user found');
      }
    });
  }

  submitIncomes(): void {
    if (this.incomeForm.valid) {
      this.currentUser$.pipe(
        switchMap(user => {
          if (user) {
            const formValue = this.incomeForm.value;
            const amount = parseFloat(formValue.amount); // Convert amount to number
            const income: Income = {
              ...formValue,
              date: new Date(formValue.date).toISOString().split('T')[0], // Convert to yyyy-MM-dd
              amount: amount.toFixed(2) // Convert to string for BigDecimal
            };
            return this.gestionBudgetService.addIncome(income);
          } else {
            console.error('No user found');
            return of(null); // Return an observable with null
          }
        }),
        catchError(error => {
          console.error('Income submission failed', error);
          return of(null); // Handle the error
        })
      ).subscribe(response => {
        if (response) {
          console.log('Income successfully added', response);
          this.incomeSubmitted.emit(); // Notify parent component
          this.incomeForm.reset(); // Reset form
        } else {
          console.error('Income submission failed');
        }
      });
    } else {
      console.error('Form is invalid');
    }
  }
  
}
