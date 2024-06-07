import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ReclamationService } from 'src/app/Services/reclamation.service';
import { UserService } from 'src/app/Services/user.service';
import { Client } from 'src/app/core/models/Client';

import { Reclamation } from 'src/app/core/models/reclamation';
import { selectCurrentUser } from 'src/app/core/models/user.selectors';
import { User } from 'src/app/store/actions/user.action';

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.css']
})
export class ReclamationComponent implements OnInit {

  reclamation:Reclamation = new Reclamation();
 

  constructor(private service:ReclamationService, private store: Store<any>,private userService: UserService){}
  ngOnInit(): void {
    
  }
  
  submitReclamation():void{
   
    
  }
}
