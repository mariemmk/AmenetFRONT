import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credit } from '../core/models/CreditRequest';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreditRequestService {

  host: string = 'http://localhost:8089';
 

  constructor(private http: HttpClient) { }

  public createCreditRequest(Credit:Credit) : Observable<Credit>{
    return this.http.post<Credit>('http://localhost:8089/amanet/credit/request',Credit)
  }
}
