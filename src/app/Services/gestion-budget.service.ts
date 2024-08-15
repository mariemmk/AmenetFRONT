import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Client } from '../core/models/Client';
import { expenses } from '../core/models/Expense';
import { Income } from '../core/models/Incomes';

@Injectable({
  providedIn: 'root'
})
export class GestionBudgetService {

  constructor(private http: HttpClient) { }

  public user$: BehaviorSubject<Client | null> = new BehaviorSubject<Client | null>(null);

  public addExpense(expense: expenses): Observable<expenses> {
    const idUser = this.user$.value?.idUser;
    if (idUser) {
      return this.http.post<expenses>(`http://localhost:8089/amanet/expense/addExpense/${idUser}`, expense);
    }
    throw new Error('No user found');
  }

  public addIncome(income: Income): Observable<Income> {
    const idUser = this.user$.value?.idUser;
    if (idUser) {
      return this.http.post<Income>(`http://localhost:8089/amanet/api/incomes/addIncome/${idUser}`, income);
    }
    throw new Error('No user found');
  }

  getIncomesByUser(idUser: number): Observable<Income[]> {
    return this.http.get<Income[]>(`http://localhost:8089/amanet/api/incomes/listIncomes/${idUser}`);
  }

  getExpensesByUser(idUser: number): Observable<expenses[]> {
    return this.http.get<expenses[]>(`http://localhost:8089/amanet/expense/listExpenses/${idUser}`);
  }
}
