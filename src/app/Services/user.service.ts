import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, tap } from 'rxjs';
import { Client } from '../core/models/Client';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { currentUser } from 'src/app/store/actions/user.action';
import { BankAccount } from '../core/models/BankAccount';
import { AccountRequest } from '../core/models/AccountRequest';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  host: string = 'http://localhost:8089';
  public isLoggedin$: ReplaySubject<boolean> = new ReplaySubject(1);
  public user$: BehaviorSubject<Client | null> = new BehaviorSubject<Client | null>(null);
  private accessToken: string = localStorage.getItem('accessToken') || '';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.accessToken}`
    })
  };

  constructor(private http: HttpClient, private store: Store<any>) {}

 
 
  public login(credentials: { email: string, password: string }): Observable<{ user: Client, accessToken: string }> {
    return this.http.post<{ user: Client, accessToken: string }>(`${this.host}/amanet/auth/login`, credentials);
     
  }

  public validateOtp(email: string, otpCode: string): Observable<{ user: Client, accessToken: string }> {
    return this.http.post<{ user: Client, accessToken: string }>(
      `http://localhost:8089/amanet/auth/validate-otp`, 
      null, {
        params: {
          email: email,
          otpCode: otpCode
        }
      }
    ).pipe(
      tap(response => {
        this.accessToken = response.accessToken;
        localStorage.setItem('accessToken', this.accessToken);
        localStorage.setItem('user', JSON.stringify(response.user));
        // Update httpOptions with the new accessToken
        this.store.dispatch(currentUser({ accessToken: this.accessToken, user: response.user }));
        this.user$.next(response.user);
        this.isLoggedin$.next(true);
      })
    );
  }
  
  
  public logout() {
    this.accessToken = '';
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    this.user$.next(null);
    this.isLoggedin$.next(false);
  }

  public sendEmail(email  : string) {
    return this.http.post<string>('http://localhost:8089/amanet/user/send-verification-code', email)
  }


  public verifyCode(code : string, email : string){
    return this.http.post<any>('http://localhost:8089/amanet/user/verify-code?verificationCode='+code,email)
}

public resetPassword(credentials: {email : string, newPass : string}){
  return this.http.post('http://localhost:8089/amanet/user/changePassword', credentials);
}
  public getCurrentUser(): Observable<Client> {
    this.accessToken = localStorage.getItem('accessToken') || '';
    return this.http.post<Client>(`${this.host}/amanet/auth/getCurrentUser`, { user: null, accessToken: this.accessToken }).pipe(
      tap((user: Client) => {
        this.store.dispatch(currentUser({ accessToken: this.accessToken, user }));
        this.user$.next(user);
        this.isLoggedin$.next(!!user);
      })
    );
  }

  public signup(user: Client): Observable<{ user: Client, accessToken: string }> {
    return this.http.post<{ user: Client, accessToken: string }>(`${this.host}/amanet/user/creationAccount`, user);
  }

  // Other methods...

  public checkPassword(user: Client, password: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.host}/trador/user/verifyOldPassword/${user.idUser}`, password);
  }

  public sendVerificationCode(email: string, code: string): Observable<any> {
    return this.http.post(`${this.host}/trador/user/verifyOldPassword?code=${code}`, email);
  }

  public bloquerUtilisateur(userId: any): Observable<any> {
    return this.http.post(`${this.host}/trador/user/bannedAccount/${userId}`, userId);
  }

  public updateimage(userId: number, formData: any): Observable<any> {
    return this.http.post<any>(`${this.host}/trador/user/uploadImage/${userId}`, formData);
  }





  public deleteUser(idUser: number): Observable<any> {
    return this.http.delete(`http://localhost:8089/amanet/user/remove/${idUser}`);
  }

  public updateUser(user: Client): Observable<Client> {
    return this.http.put<Client>(`http://localhost:8089/amanet/user/edit/${user.idUser}`, user);
  }

  retrieveUser(idUser: number): Observable<Client> {
    return this.http.get<Client>(`http://localhost:8089/amanet/user/show/${idUser}`);
  }
  

  getAllUsers(): Observable<Client[]> {
    return this.http.get<Client[]>('http://localhost:8089/amanet/user/show');
  }

  public updateClient( client:Client ):Observable<Client>{    
    return this.http.put<Client>('http://localhost:8089/amanet/user/edit/'+ client.idUser , client);
  }
  

  public afficheIdentiteBancaire(): Observable<string> {
    const idUser = this.user$.value?.idUser;
    if (idUser) {
      return this.http.get<string>(`${this.host}/amanet/user/identiteBancaire/${idUser}`, { responseType: 'text' as 'json' });
    }
    return new Observable<string>();
  }


  private flaskApiUrl= " http://127.0.0.1:85/";
  public eventsf(): Observable<any[]> {
    const url = `${this.flaskApiUrl}/currency`;
    return this.http.get<any[]>(url);
  }

  public Bourse(): Observable<any[]> {
    const url = `${this.flaskApiUrl}/Bourse`;
    return this.http.get<any[]>(url);
  }

  getBankAccounts(idUser: number): Observable<BankAccount> {
    return this.http.get<BankAccount>(`http://localhost:8089/amanet/BankAccount/user/${idUser}`);
  }


  getListAccountRequests():Observable<AccountRequest[]>{
    return this.http.get<AccountRequest[]>('http://localhost:8089/amanet/user/accountRequests');
  }

  approveAccountRequest(idRequest:number):Observable<AccountRequest>{
    return this.http.post<AccountRequest>(`http://localhost:8089/amanet/user/approve-request/${idRequest}` , null , this.httpOptions)
  }

//stats

  getCountByStatus(): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>('http://localhost:8089/amanet/BankAccount/account-requests/count-by-status');
  }




  public updateContactDetails(idUser: number, phoneNumber: string, address: string): Observable<Client> {
    // Prepare the body of the request
    const updateData = {
      phoneNumber: phoneNumber,
      address: address
    };
  
    // Make the PUT request to the backend
    return this.http.put<Client>(`http://localhost:8089/amanet/user/editContactDetails/${idUser}`, updateData, this.httpOptions);
  }
  public getUserByEmail(email: string): Observable<Client> {
    return this.http.get<Client>(`http://localhost:8089/amanet/user/getuserbyemail?email=${email}`);
  }
  
}

