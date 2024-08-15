import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Credit } from '../core/models/CreditRequest';
import { Client } from '../core/models/Client';

@Injectable({
  providedIn: 'root'
})
export class CreditRequestService {

  host: string = 'http://localhost:8089';
  public user$: BehaviorSubject<Client | null> = new BehaviorSubject<Client | null>(null);
  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    })
  };

  constructor(private http: HttpClient) { }

  createCreditRequest(
    loanType: string,
    amount: number,
    duration: number,
    idUser: number,
    carPrice?: number,
    horsepower?: number,
    employeur?: string,
    addressEmplyeur?: string,
    postOccupe?: string,
    revenuMensuels?: number,
    typeContract?: string,
    creditEnCours?: string
  ): Observable<Credit> {
    let params = new HttpParams()
      .set('loanType', loanType)
      .set('amount', amount.toString())
      .set('duration', duration.toString())
      .set('idUser', idUser.toString());

    if (carPrice) params = params.set('carPrice', carPrice.toString());
    if (horsepower) params = params.set('horsepower', horsepower.toString());
    if (employeur) params = params.set('employeur', employeur);
    if (addressEmplyeur) params = params.set('addressEmplyeur', addressEmplyeur);
    if (postOccupe) params = params.set('postOccupe', postOccupe);
    if (revenuMensuels) params = params.set('revenuMensuels', revenuMensuels.toString());
    if (typeContract) params = params.set('typeContract', typeContract);
    if (creditEnCours) params = params.set('creditEnCours', creditEnCours);

    return this.http.post<Credit>(`http://localhost:8089/amanet/credit/request`, null, { params });
  }



getAllCreditRequests(): Observable<Credit[]> {
    return this.http.get<Credit[]>(`${this.host}/amanet/credit/requests`);
  }

  approveCreditRequest(id: number): Observable<Credit> {
    return this.http.post<Credit>(`${this.host}/amanet/credit/request/${id}/approve`, null, this.httpOptions);
  }

  rejectCreditRequest(id: number): Observable<Credit> {
    return this.http.post<Credit>(`${this.host}/amanet/credit/request/${id}/reject`, null, this.httpOptions);
  }

  deleteCreditRequest(id: number): Observable<Credit> {
    return this.http.delete<Credit>(`${this.host}/amanet/credit/remove/${id}`, this.httpOptions);
  }
}
