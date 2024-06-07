import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Reclamation } from '../core/models/reclamation';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Client } from '../core/models/Client';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {

  constructor(private http : HttpClient, private store: Store<any>) { }
  public user$: BehaviorSubject<Client | null> = new BehaviorSubject<Client | null>(null);

  public addreclamation(Reclamation:Reclamation ){

    

    return this.http.post(`http://localhost:8089/amanet/reclamation/addReclamation/`,Reclamation);
    
  }

}
