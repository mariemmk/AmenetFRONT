import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SimulateurService {

  host: string = 'http://localhost:8089';
 

  constructor(private http: HttpClient) { }

  simulatePreslaireAmenagement(amount: number, loanType: string, duration: number): Observable<any> {
    const params = new HttpParams()
    .set('amount', amount.toString())
    .set('loanType', loanType)
    .set('duration', duration.toString());
    return this.http.get<any>(`${this.host}/amanet/bank/preslaire_amenagement`, { params});
  }

  simulateAutoInvest(amount: number, duration: number ,horsepower:number ): Observable<any> {
    const params= new HttpParams()
    .set('amount' , amount.toString())
    .set('duration',duration.toString())
    .set('horsepower',horsepower.toString())
    return this.http.get<any>(`${this.host}/amanet/bank/Auto_invest`, {params});
  }

  simulateCredimWatani(amount: number, duration: number, loanType: string): Observable<any> {
    const params= new HttpParams()
    .set('amount', amount.toString())
    .set('loanType', loanType)
    .set('duration', duration.toString());
    return this.http.get<any>(`${this.host}/amanet/bank/Credim_Watani`, { params });
  }

  simulateCredimExpress(amount: number, duration: number): Observable<any> {
    const params= new HttpParams()
    .set('amount' , amount.toString())
    .set('duration',duration.toString())
    return this.http.get<any>(`${this.host}/amanet/bank/Credim_Express`, { params });
  }

  simulateInvestment(amount:number , issueDate:Date , maturityDate:Date): Observable<any> {
    const params= new HttpParams()
    .set('amount' , amount.toString())
    .set('issueDate',issueDate.toString())
    .set('maturityDate',maturityDate.toString())
    return this.http.get<any>(`${this.host}/amanet/bank/simulate_Placement`,{params} );
  }

}
