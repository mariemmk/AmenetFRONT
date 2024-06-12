import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GestionBudgetService } from 'src/app/Services/gestion-budget.service';
import { UserService } from 'src/app/Services/user.service';
import { Client } from 'src/app/core/models/Client';
import { expenses } from 'src/app/core/models/Expense';
import { selectCurrentUser } from 'src/app/core/models/user.selectors';
import { typeExpence } from './typeExpens';
import { ChartOptions } from 'chart.js';
import { Income } from 'src/app/core/models/Incomes';
import { ExpenseComponent } from '../expense/expense.component';
import { IncomeComponent } from '../income/income.component';

@Component({
  selector: 'app-gestion-budget',
  templateUrl: './gestion-budget.component.html',
  styleUrls: ['./gestion-budget.component.css']
})
export class GestionBudgetComponent implements OnInit ,AfterViewInit  {
  @ViewChild(ExpenseComponent) expenseModal!: ExpenseComponent;
  @ViewChild(IncomeComponent) incomeModal!: IncomeComponent;



  currentUser$: Observable<Client>;
  expenses: expenses = new expenses();
  income: Income = new Income();

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLabels = [ ['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales' ];
  public pieChartDatasets = [ {
    data: [300, 500, 100]
  } ];
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(
    private gestionBudgetService: GestionBudgetService, 
    private store: Store<any>, 
    private userService: UserService,
    
  ) {
    this.currentUser$ = this.store.pipe(select(selectCurrentUser));
  }
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(user => {
      this.gestionBudgetService.user$.next(user);
    });
  }

  openIncomeModal() {
    this.incomeModal.showModal = true;
  }

  openExpenseModal() {
    this.expenseModal.showModal = true;
  }
}
