import { HttpClient } from '@angular/common/http';
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
      return this.http.post<Credit>(`${this.host}/amanet/credit/request/${idUser}`, creditRequest);
    }
    throw new Error('No user found');
  }
}
