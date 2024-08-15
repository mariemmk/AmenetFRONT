import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GestionBudgetService } from 'src/app/Services/gestion-budget.service';
import { UserService } from 'src/app/Services/user.service';
import { Client } from 'src/app/core/models/Client';
import { expenses } from 'src/app/core/models/Expense';
import { Income } from 'src/app/core/models/Incomes';
import { selectCurrentUser } from 'src/app/core/models/user.selectors';
import { ExpenseComponent } from '../expense/expense.component';
import { IncomeComponent } from '../income/income.component';
import { BankAccount } from 'src/app/core/models/BankAccount';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'app-gestion-budget',
  templateUrl: './gestion-budget.component.html',
  styleUrls: ['./gestion-budget.component.css']
})
export class GestionBudgetComponent implements AfterViewInit {
  @ViewChild('expenseModal') expenseModal!: ExpenseComponent;
  @ViewChild('incomeModal') incomeModal!: IncomeComponent;

  currentUser$: Observable<Client>;
  bankAccount!: BankAccount;
  expensesList: expenses[] = [];
  incomesList: Income[] = [];
  budget: number = 0;

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLabels: string[] = [];
  public pieChartData: number[] = [];
  public pieChartLegend = true;

  constructor(
    private gestionBudgetService: GestionBudgetService,
    private store: Store<any>,
    private userService: UserService
  ) {
    this.currentUser$ = this.store.pipe(select(selectCurrentUser));
  }




  openIncomeModal() {
    if (this.incomeModal) {
      this.incomeModal.showModal = true;
    }
  }

  openExpenseModal() {
    if (this.expenseModal) {
      this.expenseModal.showModal = true;
    }
  }

  loadExpenses(user: Client) {
    this.gestionBudgetService.getExpensesByUser(user.idUser).subscribe(expenses => {
      this.expensesList = expenses;
      this.updateChart(expenses);
    });
  }

  loadIncomes(user: Client) {
    this.gestionBudgetService.getIncomesByUser(user.idUser).subscribe(incomes => {
      this.incomesList = incomes;
    });
  }

  updateChart(expenses: expenses[]) {
    this.pieChartLabels = expenses.map(e => e.category);
    this.pieChartData = expenses.map(e => e.amount as number);
  }
  ngAfterViewInit(): void {
    if (!this.expenseModal || !this.incomeModal) {
      console.error('Modals are not available!');
    }
  }
}
