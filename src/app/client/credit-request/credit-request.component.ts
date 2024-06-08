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
    accountNumber: '',
    clientName: '',
    clientCIN: 0,
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
    id: 0,
    agence: '',
    date: new Date(),
    clientIdNumber: '',
    status: ''
  };

  constructor(
    private store: Store<any>,
    private userService: UserService,
    private creditService: CreditRequestService
  ) {
    this.currentUser$ = this.store.pipe(select(selectCurrentUser));
  }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(user => {
      this.creditService.user$.next(user);
      if (user) {
        this.creditRequest.clientName = user.firstName;  // Assume user.name is the property for the client's name
        this.creditRequest.accountNumber = user.accountNumber;  // Assume user.accountNumber is the property for the account number
        this.creditRequest.clientCIN=user.cin;
      }
    });
  }

  submitCreditRequest(): void {
    this.currentUser$.subscribe(user => {
      if (user) {
        this.creditService.createCreditRequest(this.creditRequest).subscribe(
          response => {
            console.log('Credit request successful', response);
          },
          error => {
            console.error('Credit request failed', error);
          }
        );
      } else {
        console.error('No user found');
      }
    });
  }
}
