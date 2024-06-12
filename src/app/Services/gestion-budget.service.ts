import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { Client } from '../core/models/Client';
import { expenses } from '../core/models/Expense';
import { Income } from '../core/models/Incomes';

@Injectable({
  providedIn: 'root'
})
export class GestionBudgetService {

  constructor(private http : HttpClient, private store: Store<any>) { }
  public user$: BehaviorSubject<Client | null> = new BehaviorSubject<Client | null>(null);



  
  public addExpense(expenses:expenses ):Observable<expenses>{
    const idUser=this.user$.value?.idUser;
    if(idUser){
      return this.http.post<expenses>(`http://localhost:8089/amanet/expense/addExpense/${idUser}`,expenses);
    }
    throw new Error('No user found'); 
    
  }
  public addIncome(Income:Income ):Observable<Income>{
    const idUser=this.user$.value?.idUser;
    if(idUser){
      return this.http.post<Income>(`http://localhost:8089/amanet/api/incomes/addIncome${idUser}`,Income);
    }
    throw new Error('No user found'); 
    
  }
 
}
