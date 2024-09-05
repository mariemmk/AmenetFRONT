import { AfterViewInit, Component, OnInit,ChangeDetectorRef  } from '@angular/core';
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

  // Données du graphique en ligne
  
  public lineChartLabels: string[] = [];
  public lineChartData: ChartData<'line'> = {
    datasets: [
      {
        data: [], 
        label: 'Income',
        borderColor: 'rgba(0,123,255,1)',
        backgroundColor: 'rgba(0,123,255,0.3)',
        fill: false,
      },
      {
        data: [], 
        label: 'Expenses',
        borderColor: 'rgba(255,0,0,1)',
        backgroundColor: 'rgba(255,0,0,0.3)',
        fill: false,
      }
    ]
  };
  
 
 
  public lineChartLegend = true;
  public lineChartType: 'line' = 'line';
  
  
  

  // Données des graphiques circulaires
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
    private userService: UserService, private cdRef: ChangeDetectorRef
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
          console.log('Bank Accounts Response:', response);
          this.bankAccount = response;
        }, error => {
          console.error('Error fetching bank accounts:', error);
        });
  
        this.loadIncomes(user);
        this.loadExpenses(user);
        this.loadMonthlyData(user.idUser); // Important: load monthly expenses to update the line chart
      } else {
        console.error('No current user found');
        this.cdRef.detectChanges();
      }
    });
  }
  
  ngAfterViewInit(): void {
    this.currentUser$.subscribe(user => {
      if (user) {
        this.userService.getBankAccounts(user.idUser).subscribe(response => {
          this.bankAccount = response;
          this.cdRef.detectChanges(); // Ensure change detection is run after the view is initialized
        });
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

  loadMonthlyData(idUser: number): void {
    this.gestionBudgetService.getMonthlyData().subscribe(
      (data: any) => {
        console.log('Monthly Data:', data);
        this.updateLineChart(data);
      },
      error => {
        console.error('Failed to load monthly data', error);
      }
    );
  }
  
  updateLineChart(data: any): void {
    const labels: string[] = [];
    const incomeData: number[] = [];
    const expenseData: number[] = [];
  
    Object.keys(data).forEach(month => {
      labels.push(month);
      incomeData.push(data[month].income);
      expenseData.push(data[month].expense);
    });
  
    this.lineChartLabels = labels;
    this.lineChartData = {
      labels: labels,
      datasets: [
        {
          data: incomeData,
          label: 'Income',
          borderColor: 'rgba(0,123,255,1)',
          backgroundColor: 'rgba(0,123,255,0.3)',
          fill: false,
        },
        {
          data: expenseData,
          label: 'Expenses',
          borderColor: 'rgba(255,0,0,1)',
          backgroundColor: 'rgba(255,0,0,0.3)',
          fill: false,
        }
      ]
    };
  
    this.cdRef.detectChanges();
  }
  
  
  
}
