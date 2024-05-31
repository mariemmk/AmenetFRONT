import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CreditRequestService } from 'src/app/Services/credit-request.service';
import { UserService } from 'src/app/Services/user.service';
import { Client } from 'src/app/core/models/Client';
import { Credit } from 'src/app/core/models/CreditRequest';
import { selectCurrentUser } from 'src/app/core/models/user.selectors';

@Component({
  selector: 'app-credit-request',
  templateUrl: './credit-request.component.html',
  styleUrls: ['./credit-request.component.css']
})
export class CreditRequestComponent implements OnInit {
  currentUser$: Observable<Client>;

  creditRequest: Credit = {
    agence: '',
    accountNumber: '',
    clientName: '',
    clientCIN: '',
    clientIdNumber: '',
    clientJobStatus: '',
    clientNetSalary: 0,
    clientOtherIncomeSources: '',
    clientOtherIncomeAmount: 0,
    creditAmount: 0,
    creditPurpose: '',
    repaymentFrequency: '',
    durationYears: 0,
    convention: '',
    conventionName: '',
    repaymentType: '',
    propertyOrConstructionAmount: 0,
    id:0,
    date:  new Date(),
    status: 'PENDING'
  };
  constructor(private creditRequestServise:CreditRequestService ,private store:Store<any> , private userService:UserService){
    this.currentUser$ = this.store.pipe(select(selectCurrentUser));
  }
  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(user => {
      this.creditRequest.user = user;
     
    });
  }

  
   
  
  createCreditRequest():void{
    this.creditRequestServise.createCreditRequest(this.creditRequest).subscribe(
      Response =>{
        console.log('Demande de crédit créée avec succès', Response)
      },
      error => {
        console.error('Erreur lors de la création de la demande de crédit', error);
      }
    )

  }

}
