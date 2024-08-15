import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GestionBudgetService } from 'src/app/Services/gestion-budget.service';
import { Client } from 'src/app/core/models/Client';
import { expenses } from 'src/app/core/models/Expense';
import { selectCurrentUser } from 'src/app/core/models/user.selectors';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {
  currentUser$: Observable<Client>;
  expenses: expenses = new expenses();
  showModal = false;
  categorys = ['Food', 'Transport', 'Utilities']; // Example categories

  constructor(
    private gestionBudgetService: GestionBudgetService,
    private store: Store<any>
  ) {
    this.currentUser$ = this.store.pipe(select(selectCurrentUser));
  }

  ngOnInit(): void {}

  toggleModal() {
    this.showModal = !this.showModal;
  }

  submitExpense(): void {
    this.currentUser$.subscribe(user => {
      if (user) {
        this.gestionBudgetService.addExpense(this.expenses).subscribe(
          response => {
            console.log('Expense successfully added', response);
          },
          error => {
            console.error('Expense submission failed', error);
          }
        );
      } else {
        console.error('No user found');
      }
    });
  }
}
