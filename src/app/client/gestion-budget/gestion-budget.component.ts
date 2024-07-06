import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GestionBudgetService } from 'src/app/Services/gestion-budget.service';
import { UserService } from 'src/app/Services/user.service';
import { Client } from 'src/app/core/models/Client';
import { expenses } from 'src/app/core/models/Expense';
import { selectCurrentUser } from 'src/app/core/models/user.selectors';
import { ChartOptions } from 'chart.js';
import { Income } from 'src/app/core/models/Incomes';
import { ExpenseComponent } from '../expense/expense.component';
import { IncomeComponent } from '../income/income.component';
import { BankAccount } from 'src/app/core/models/BankAccount';

@Component({
  selector: 'app-gestion-budget',
  templateUrl: './gestion-budget.component.html',
  styleUrls: ['./gestion-budget.component.css']
})
export class GestionBudgetComponent implements OnInit, AfterViewInit {
  @ViewChild('expenseModal') expenseModal!: ExpenseComponent;
  @ViewChild('incomeModal') incomeModal!: IncomeComponent;

  currentUser$: Observable<Client>;
  currentUser: Client | undefined;
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

  ngOnInit(): void {
    this.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.userService.getBankAccounts(user.idUser).subscribe(accounts => {
          this.bankAccount = accounts;
          if (this.bankAccount) {
            this.budget = this.bankAccount.accountBalance; // Utiliser le premier compte bancaire pour le budget
          }
        });
        this.loadExpenses(user.idUser);
        this.loadIncomes(user.idUser);
      }
    });
  }

  ngAfterViewInit(): void {}

  openIncomeModal() {
    this.incomeModal.showModal = true;
  }

  openExpenseModal() {
    this.expenseModal.showModal = true;
  }

  loadExpenses(userId: number) {
    this.gestionBudgetService.getExpensesByUser(userId).subscribe(expenses => {
      this.expensesList = expenses;
      this.updateChart(expenses);
    });
  }

  loadIncomes(userId: number) {
    this.gestionBudgetService.getIncomesByUser(userId).subscribe(incomes => {
      this.incomesList = incomes;
    });
  }

  updateChart(expenses: expenses[]) {
    this.pieChartLabels = expenses.map(e => e.category);
    this.pieChartData = expenses.map(e => e.amount as number);
  }
}
