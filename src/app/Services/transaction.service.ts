import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable,  } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { transfer } from '../core/models/Transfer';
import { Client } from '../core/models/Client';
import { Credit } from '../core/models/CreditRequest';
import { CreditDebitRequest } from '../core/models/CreditDebitRequest';
import { BankResponse } from '../core/models/BankResponse';
import { TransferRequest } from '../core/models/TransferRequest';
import { Transaction } from '../core/models/Transactions';



@Injectable({
  providedIn: 'root'
})
export class TransactionService  {

  host: string = 'http://localhost:8089';
  public user$: BehaviorSubject<Client | null> = new BehaviorSubject<Client | null>(null);
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    })
  };

  constructor(private http: HttpClient) { }

  virementCompteACompte(transfer:transfer){
    return this.http.post('http://localhost:8089/amanet/BankAccount/transfer' , transfer , this.httpOptions)
  }


  creditAccount(request: CreditDebitRequest): Observable<BankResponse> {
    return this.http.post<BankResponse>(`ttp://localhost:8089/amanet/user/credit`, request, this.httpOptions);
  }

  debitAccount(request: CreditDebitRequest): Observable<BankResponse> {
    return this.http.post<BankResponse>(`http://localhost:8089/amanet/user/debit`, request, this.httpOptions);
  }

  transfer(request: TransferRequest): Observable<BankResponse> {
    return this.http.post<BankResponse>(``, request, this.httpOptions);
  }

  getTransactions(accountNumber: string, startDate: string, endDate: string): Observable<Transaction[]> {
    let params = new HttpParams()
      .set('accountNumber', accountNumber)
      .set('startDate', startDate)
      .set('endDate', endDate);
    
    return this.http.get<Transaction[]>('http://localhost:8089/amanet/bank/historique', { params });
  }


  getAllTransactions():Observable<Transaction[]>{
    return this.http.get<Transaction[]>('http://localhost:8089/amanet/bank/transactions')
    
}


getTransactionsByDate(date: string): Observable<Transaction[]> {
  const params = new HttpParams().set('date', date);
  return this.http.get<Transaction[]>(`http://localhost:8089/amanet/bank/transactionsByDate`, { params });
}


getTransactionsByAccountNumber(accountNumber: string): Observable<Transaction[]> {
  return this.http.get<Transaction[]>(`http://localhost:8089/amanet/bank/transactionsByAccountNumber?accountNumber=${accountNumber}`);
}
}
