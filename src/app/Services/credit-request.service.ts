import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  createCreditRequest(idUser: number, formData: FormData): Observable<any> {
    return this.http.post(`${this.host}/amanet/credit/request/${idUser}`, formData);
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
