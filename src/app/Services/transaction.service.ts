import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable,  } from '@angular/core';

import { Observable } from 'rxjs';
import { transactionModel } from '../core/models/TransactionM';



@Injectable({
  providedIn: 'root'
})
export class TransactionService  {

  host: string = 'http://localhost:8089';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    })
  };

  constructor(private http: HttpClient) { }

  virementCompteACompte(transaction:transactionModel){
    return this.http.post(this.host+"/amanet/user/transfer" , transaction , this.httpOptions)
  }


}
