import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { Credit } from '../core/models/CreditRequest';
import { Client } from '../core/models/Client';

@Injectable({
  providedIn: 'root'
})
export class CreditRequestService {

  host: string = 'http://localhost:8089';
  public user$: BehaviorSubject<Client | null> = new BehaviorSubject<Client | null>(null);
  private httpOptions = {
   
  };

  constructor(private http: HttpClient) { }

/*  createCreditRequest(
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
    if (file) params = params.set('creditEnCours', file);

    return this.http.post<Credit>(`http://localhost:8089/amanet/credit/request`, null, { params });
  }
*/

getCountByStatus(): Observable<any> {
  return this.http.get<any>(`http://localhost:8089/amanet/credit/count-by-status`);
}

getCountByCreditType(): Observable<any> {
  return this.http.get<any>(`http://localhost:8089/amanet/credit/count-by-credit-type`);
}

  createCreditRequest(formData: FormData): Observable<Credit> {
    return this.http.post<Credit>(`http://localhost:8089/amanet/credit/request`, formData)
  }
  
getAllCreditRequests(): Observable<Credit[]> {
    return this.http.get<Credit[]>(`${this.host}/amanet/credit/requests`);
  }

  approveCreditRequest(id: number): Observable<Credit> {
    return this.http.put<Credit>(`http://localhost:8089/amanet/credit/approve/${id}`, null, this.httpOptions);
  }

  rejectCreditRequest(id: number): Observable<Credit> {
    return this.http.put<Credit>(`http://localhost:8089/amanet/credit/reject/${id}`, null, this.httpOptions);
  }

  deleteCreditRequest(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8089/amanet/credit/deletcredit/${id}`).pipe(
      catchError(error => {
        console.error('Error occurred while deleting credit request:', error);
        return throwError(error); // Rethrow the error
      })
    );
  }
  
  downloadFile(id: number): Observable<HttpResponse<Blob>> {
    return this.http.get(`http://localhost:8089/amanet/credit/request/${id}/file`, { responseType: 'blob', observe: 'response' });
  }

  getCreditsByUserId(idUser:number): Observable<Credit[]> {

      return this.http.get<Credit[]>(`http://localhost:8089/amanet/credit/user/${idUser}`);
   
  }

}
