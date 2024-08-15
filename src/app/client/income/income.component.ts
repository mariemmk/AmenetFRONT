import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GestionBudgetService } from 'src/app/Services/gestion-budget.service';
import { Client } from 'src/app/core/models/Client';
import { Income } from 'src/app/core/models/Incomes';
import { selectCurrentUser } from 'src/app/core/models/user.selectors';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit {
  currentUser$: Observable<Client>;
  income: Income = new Income();
  showModal = false;

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

  submitIncomes(): void {
    this.currentUser$.subscribe(user => {
      if (user) {
        this.gestionBudgetService.addIncome(this.income).subscribe(
          response => {
            console.log('Income successfully added', response);
          },
          error => {
            console.error('Income submission failed', error);
          }
        );
      } else {
        console.error('No user found');
      }
    });
  }
}
