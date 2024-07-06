import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credit } from '../core/models/CreditRequest';
import { BehaviorSubject, Observable } from 'rxjs';
import { Client } from '../core/models/Client';

@Injectable({
  providedIn: 'root'
})
export class CreditRequestService {

  host: string = 'http://localhost:8089';
  public user$: BehaviorSubject<Client | null> = new BehaviorSubject<Client | null>(null);
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    })
  };
  constructor(private http: HttpClient) { }

  public afficheIdentiteBancaire(): Observable<string> {
    const idUser = this.user$.value?.idUser;
    if (idUser) {
      return this.http.get<string>(`${this.host}/amanet/user/identiteBancaire/${idUser}`, { responseType: 'text' as 'json' });
    }
    return new Observable<string>();
  }

  public createCreditRequest(creditRequest: Credit): Observable<Credit> {
    const idUser = this.user$.value?.idUser;
  
    if (idUser) {
      let params = new HttpParams()
        .set('loanType', creditRequest.loanType)
        .set('amount', creditRequest.amount.toString())
        .set('duration', creditRequest.duration.toString());
  
      // Ajouter les paramètres facultatifs s'ils sont définis
      if (creditRequest.carPrise) {
        params = params.set('carPrice', creditRequest.carPrise.toString());
      }
      if (creditRequest.horsePower) {
        params = params.set('horsepower', creditRequest.horsePower.toString());
      }
  
      return this.http.post<Credit>(`${this.host}/amanet/credit/create/${idUser}`, null, { params });
    }
  
    throw new Error('No user found');
  }
  
  getAllCreditRequests(): Observable<Credit[]> {
    return this.http.get<Credit[]>('http://localhost:8089/amanet/credit/requests');
  }

  approveCreditRequest(id:number):Observable<Credit>{
    return this.http.post<Credit>(`http://localhost:8089/amanet/credit/request/${id}/approve`, null , this.httpOptions)
  }

  rejectCreditRequest(id:number):Observable<Credit>{
    return this.http.post<Credit>(`http://localhost:8089/amanet/credit/request/${id}/reject)`,null, this.httpOptions)
  }

}
