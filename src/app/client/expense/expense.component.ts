import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GestionBudgetService } from 'src/app/Services/gestion-budget.service';
import { Client } from 'src/app/core/models/Client';
import { expenses } from 'src/app/core/models/Expense'; // Ensure correct path
import { selectCurrentUser } from 'src/app/core/models/user.selectors';
import { typeExpence } from './typeExpens';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {
  currentUser$: Observable<Client | null>;
  expenseForm: FormGroup;
  showModal = false;
  categories = typeExpence; // Use the imported types

  constructor(
    private gestionBudgetService: GestionBudgetService,
    private store: Store<any>,
    private fb: FormBuilder
  ) {
    this.currentUser$ = this.store.pipe(select(selectCurrentUser));

    this.expenseForm = this.fb.group({
      category: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
      description: [''],
      date: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  toggleModal(): void {
    this.showModal = !this.showModal;
  }

 

  submitExpense(): void {
    if (this.expenseForm.valid) {
      this.currentUser$.subscribe(user => {
        if (user) {
          const expense: expenses = {
            ...this.expenseForm.value,
            amount: parseFloat(this.expenseForm.value.amount), // Convert amount to number
            date: new Date(this.expenseForm.value.date).toISOString().split('T')[0], // Convert to yyyy-MM-dd format
            // user // Attach user info if needed
          };
          this.gestionBudgetService.addExpense(expense).subscribe(
            response => {
              console.log('Expense successfully added', response);
              this.toggleModal(); // Close modal
              this.expenseForm.reset(); // Reset form
            },
            error => {
              console.error('Expense submission failed', error);
            }
          );
        } else {
          console.error('No user found');
        }
      });
    } else {
      console.error('Form is invalid');
    }
  }
  
}
