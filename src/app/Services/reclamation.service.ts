import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Reclamation } from '../core/models/reclamation';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Client } from '../core/models/Client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {

  constructor(private http : HttpClient, private store: Store<any>) { }
  public user$: BehaviorSubject<Client | null> = new BehaviorSubject<Client | null>(null);



  public addreclamation(reclamation:Reclamation ):Observable<Reclamation>{
    const idUser=this.user$.value?.idUser;
    if(idUser){
      return this.http.post<Reclamation>(`http://localhost:8089/amanet/reclamation/create/${idUser}`,reclamation);
    }
    throw new Error('No user found'); 
    
  }

  getAllReclamations(): Observable<Reclamation[]> {
    return this.http.get<Reclamation[]>('http://localhost:8089/amanet/reclamation/showReclamation');
  }
  


deleteReclamation(reclamationId:number):Observable<Reclamation>{
  return this.http.delete<Reclamation>(`http://localhost:8089/amanet/reclamation/remove/${reclamationId}`)
}
  
 
}
