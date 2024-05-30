import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, tap } from 'rxjs';
import { Client } from '../core/models/Client';
//import { Reclamation } from '../models/Reclamation';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { User, currentUser } from 'src/app/store/actions/user.action';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  host :string = 'http://localhost:8089';
  public isLoggedin$ : ReplaySubject<boolean> = new ReplaySubject(1);
  public user$: BehaviorSubject<Client | null> = new BehaviorSubject<Client |null>(null);
  private accessToken!: string;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    })
  };

  constructor(private http : HttpClient, private store: Store<any>) {
   }

  public login(credentials:{email:string,password:string}) : Observable<Client>{
    return this.http.post<Client>('http://localhost:8089/amanet/auth/login',credentials)
  }

  public getCurrentUser() : Observable<Client>{
    this.accessToken = localStorage.getItem("accessToken") || '';
    return this.http.post<Client>('http://localhost:8089/amanet/auth/getCurrentUser',{user : null , accessToken : this.accessToken}).pipe(
      tap((user : Client) => {
        this.store.dispatch(currentUser({accessToken : this.accessToken, user : user}))
        this.user$.next(user);
        if (user) {
         
          this.isLoggedin$.next(true);
        } else{
          this.isLoggedin$.next(false);
        }
      })
    );
  }

  public signup(user : Client) : Observable<Client>{
    console.log(user);
    return this.http.post<Client>('http://localhost:8089/amanet/user/creationAccount',user)
  }

  public sendEmail(email  : string) {
    return this.http.post<string>('http://localhost:8089/trador/user/send-verification-code', email)
  }

  public verifyCode(code : string, email : string){
    return this.http.post<any>('http://localhost:8089/trador/user/verify-code?verificationCode='+code,email)
  }

  public resetPassword(credentials: {email : string, newPass : string}){
    return this.http.post('http://localhost:8089/trador/user/changePassword', credentials);
  }

  /*uploadImage(userId: number): Observable<any> {
    return this.http.post(`http://localhost:8089/trador/user/uploadImage/${userId}`, this.updateClient);
}*/
/*uploadImage(userId: number, file: File): Observable<any> {
  const formData: FormData = new FormData();
  formData.append('file', file);

  return this.http.post(`http://localhost:8089/trador/user/uploadImage/${userId}`, formData);
}*/
/*public uploadPhoto(idUser:number){
  return this.http.post('http://localhost:8089/trador/user/uploadProfilePicture/'+idUser,this.updateClient);
}*/
  
  public deleteUser(userId: number): Observable<any> {
    return this.http.delete(`http://localhost:8089/trador/user/remove/${userId}`);
  }

  public updateUser(user: Client): Observable<Client> {
    return this.http.put<Client>(`http://localhost:8089/trador/user/edit/${user.idUser}`, user);
  }

  retrieveUser(userId: number): Observable<Client> {
    return this.http.get<Client>(`http://localhost:8089/trador/user/show/${userId}`);
  }
  

  getAllUsers(): Observable<Client[]> {
    return this.http.get<Client[]>('http://localhost:8089/trador/user/show');
  }

  public updateClient( client:Client ):Observable<Client>{    
    return this.http.put<Client>('http://localhost:8089/trador/user/edit/'+ client.idUser , client);
  }

  public getClient(user : Client) : Observable<Client>{
    return this.http.get<Client>('http://localhost:8089/trador/user/show/'+user.idUser);
  }
  
  /*public addreclamation(Reclamation:Reclamation){
    return this.http.post('http://localhost:8089/trador/reclamation/addReclamation',Reclamation);
  }*/

  public checkPassword(user : Client, password : string) : Observable<boolean>{
    return this.http.post<boolean>("http://localhost:8089/trador/user/verifyOldPassword/"+user.idUser, password);
  }

  public sendVerificationCode(email : string , code : string){
    return this.http.post("http://localhost:8089/trador/user/verifyOldPassword?code="+code, email);
  }

  public bloquerUtilisateur(userId:any){
    return this.http.post("http://localhost:8089/trador/user/bannedAccount/" + userId , userId);
  }

  public updateimage(userId: number, formData:any){ 
    return this.http.post<any>(`http://localhost:8089/trador/user/uploadImage/${userId}`, formData)}


   
  afficheIdentiteBancaire(idUser: number): Observable<string> {
    return this.http.get(`http://localhost:8089/amanet/user/identiteBancaire/${idUser}`, { responseType: 'text' });
  }
}