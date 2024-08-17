import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GestionBudgetService } from 'src/app/Services/gestion-budget.service';
import { UserService } from 'src/app/Services/user.service';
import { Client } from 'src/app/core/models/Client';
import { expenses } from 'src/app/core/models/Expense';
import { Income } from 'src/app/core/models/Incomes';
import { selectCurrentUser } from 'src/app/core/models/user.selectors';
import { BankAccount } from 'src/app/core/models/BankAccount';
import { ChartData, ChartOptions } from 'chart.js';

import { currentUser } from 'src/app/store/actions/user.action';
declare var bootstrap: any;

@Component({
  selector: 'app-gestion-budget',
  templateUrl: './gestion-budget.component.html',
  styleUrls: ['./gestion-budget.component.css']
})
export class GestionBudgetComponent implements OnInit {
  currentUser$: Observable<Client>;
  bankAccount!: BankAccount;
  expensesList: expenses[] = [];
  incomesList: Income[] = [];
  monthlyExpenses: Map<string, number> = new Map();

  public lineChartData: ChartData<'line'> = {
    datasets: [{
      data: [], 
      label: 'Monthly Expenses',
      borderColor: 'rgba(0,123,255,1)',
      backgroundColor: 'rgba(0,123,255,0.3)',
      fill: true // if you want the area under the line to be filled
    }]
  };
  
  public lineChartLabels: string[] = [];
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
  };
  public lineChartLegend = true;
  public lineChartType: 'line' = 'line'; // Explicitly typing as 'line'
  public lineChartPlugins = [];
  

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
  };

  public chartLegend = true;
  public chartPlugins = [];

  public incomeChartData: ChartData<'pie', number[]> = {
    labels: [],
    datasets: [{ data: [] }]
  };
  
  public expenseChartData: ChartData<'pie', number[]> = {
    labels: [],
    datasets: [{ data: [] }]
  };

  constructor(
    private gestionBudgetService: GestionBudgetService,
    private store: Store<any>,
    private userService: UserService
  ) {
    this.currentUser$ = this.store.pipe(select(selectCurrentUser));
  }

  ngOnInit(): void {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    const accessToken = localStorage.getItem('accessToken') || '';

    if (storedUser && storedUser.idUser && accessToken) {
      this.store.dispatch(currentUser({ user: storedUser, accessToken }));
    }

    this.currentUser$.subscribe(user => {
      if (user) {
        this.userService.getBankAccounts(user.idUser).subscribe(response => {
          this.bankAccount = response;
        }, error => {
          console.error('Error fetching bank accounts:', error);
        });

        this.loadIncomes(user);
        this.loadExpenses(user);
        this.gestionBudgetService.getMonthlyExpenses().subscribe(
          (data: any) => {
            console.log('Received data:', data); // Debugging line
            // Convert data to a Map if needed
            // Existing conversion code
          },
          error => {
            console.error('Failed to load monthly expenses', error);
          }
        );
      } else {
        console.error('No current user found');
      }
    });
  }

  loadExpenses(user: Client) {
    this.gestionBudgetService.getExpensesByUser(user.idUser).subscribe(expenses => {
      this.expensesList = expenses;
      this.updateExpenseChart(expenses);
    }, error => {
      console.error('Error loading expenses:', error);
    });
  }

  loadIncomes(user: Client) {
    this.gestionBudgetService.getIncomesByUser(user.idUser).subscribe(incomes => {
      this.incomesList = incomes;
      this.updateIncomeChart(incomes);
    }, error => {
      console.error('Error loading incomes:', error);
    });
  }

  updateExpenseChart(expenses: expenses[]) {
    this.expenseChartData.labels = expenses.map(exp => exp.category);
    this.expenseChartData.datasets[0].data = expenses.map(exp => +exp.amount);
  }

  updateIncomeChart(incomes: Income[]) {
    this.incomeChartData.labels = incomes.map(inc => inc.category);
    this.incomeChartData.datasets[0].data = incomes.map(inc => +inc.amount);
  }

  openIncomeModal() {
    const modalElement = document.getElementById('incomeModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  openExpenseModal() {
    const modalElement = document.getElementById('expenseModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  deleteExpense(idExpense: number): void {
    this.currentUser$.subscribe(user => {
      this.gestionBudgetService.removeExpense(idExpense).subscribe(
        () => {
          this.loadExpenses(user);
        },
        error => {
          console.error('Expense deletion failed', error);
        }
      );
    });
  }

  deleteIncome(idIncome: number): void {
    this.currentUser$.subscribe(user => {
      this.gestionBudgetService.removeIncome(idIncome).subscribe(
        () => {
          this.loadIncomes(user);
        },
        error => {
          console.error('Income deletion failed', error);
        }
      );
    });
  }

  loadMonthlyExpenses(): void {
    this.currentUser$.subscribe(user => {
      if (user) {
        this.gestionBudgetService.getMonthlyExpenses().subscribe(
          (data: any) => {
            // Convert object to Map
            this.monthlyExpenses = new Map(Object.entries(data));
            this.updateChartData();
          },
          error => {
            console.error('Failed to load monthly expenses', error);
          }
        );
      }
    });
  }
  

  updateChartData(): void {
    const labels: string[] = [];
    const data: number[] = [];
  
    this.monthlyExpenses.forEach((value, key) => {
      labels.push(key);
      data.push(value);
    });
  
    this.lineChartLabels = labels;
    this.lineChartData.datasets[0].data = data;
  }
  
  
}
