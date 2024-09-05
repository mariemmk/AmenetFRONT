import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Client } from '../core/models/Client';
import { expenses } from '../core/models/Expense';
import { Income } from '../core/models/Incomes';

@Injectable({
  providedIn: 'root'
})
export class GestionBudgetService {
  private userSubject: BehaviorSubject<Client | null> = new BehaviorSubject<Client | null>(null);
  public user$: Observable<Client | null> = this.userSubject.asObservable();

  constructor(private http: HttpClient) {  
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (storedUser && storedUser.idUser) {
      this.userSubject.next(storedUser);
    }
  }

  public addExpense(expense: expenses): Observable<expenses> {
    const user = this.userSubject.value;
    if (user && user.idUser) {
      return this.http.post<expenses>(`http://localhost:8089/amanet/expense/addExpense/${user.idUser}`, expense);
    }
    return throwError('No user found');
  }

  public setUser(user: Client): void {
    this.userSubject.next(user);
  }

  public addIncome(income: Income): Observable<Income> {
    const user = this.userSubject.value;
    if (user && user.idUser) {
      return this.http.post<Income>(`http://localhost:8089/amanet/api/incomes/addIncome/${user.idUser}`, income);
    }
    return throwError('No user found');
  }

  getIncomesByUser(idUser: number): Observable<Income[]> {
    return this.http.get<Income[]>(`http://localhost:8089/amanet/api/incomes/listIncomes/${idUser}`);
  }

  getExpensesByUser(idUser: number): Observable<expenses[]> {
    return this.http.get<expenses[]>(`http://localhost:8089/amanet/expense/listExpenses/${idUser}`);
  }

  removeExpense(idExpense: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8089/amanet/expense/remove/${idExpense}`);
  }
  removeIncome(idIncome: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8089/amanet/api/incomes/remove/${idIncome}`);
  }
  // Get Monthly Expenses
  getMonthlyExpenses(): Observable<Map<string, number>> {
    const user = this.userSubject.value;
    if (user && user.idUser) {
    return this.http.get<Map<string, number>>(`http://localhost:8089/amanet/expense/monthly/${user.idUser}`);
  }
  return throwError('No user found');
  }

  updateIncome(idIncome: number, updatedIncome: Income): Observable<Income> {
    return this.http.put<Income>(`http://localhost:8089/amanet/api/incomes/update/${idIncome}`, updatedIncome);
  }
  
  updateexpense(idIncome: number, updatedIncome: Income): Observable<Income> {
    return this.http.put<Income>(`http://localhost:8089/amanet/api/incomes/update/${idIncome}`, updatedIncome);
  }
  getMonthlyData(): Observable<Map<string, { income: number, expense: number }>> {
    const user = this.userSubject.value;
    if (user && user.idUser) {

    return this.http.get<Map<string, { income: number, expense: number }>>(`http://localhost:8089/amanet/api/incomes/monthly/${user.idUser}`);
  }
  return throwError('No user found');
  }
  
}
