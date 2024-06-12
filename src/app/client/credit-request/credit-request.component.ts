import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CreditRequestService } from 'src/app/Services/credit-request.service';
import { UserService } from 'src/app/Services/user.service';
import { Client } from 'src/app/core/models/Client';
import { Credit } from 'src/app/core/models/CreditRequest';
import { selectCurrentUser } from 'src/app/core/models/user.selectors';
import { typeLoans } from './LoansType';

@Component({
  selector: 'app-credit-request',
  templateUrl: './credit-request.component.html',
  styleUrls: ['./credit-request.component.css']
})
export class CreditRequestComponent implements OnInit {
  currentUser$: Observable<Client>;
  currentUser: Client | null = null;
  creditRequest: Credit = {
    status: '',
    id: 0,
    loanType: '',
    amount: 0,
    duration: 0,
    interestRate: 0,
    monthlyPayment: 0,
    requestDate: '',
    user: null,  // Initialement null, sera mis à jour avec l'utilisateur connecté
    amortizationSchedule: [],
    carPrise:0,
    horsePower:0,
  };
  showForm: boolean = true; 
  constructor(
    private store: Store<any>,
    private userService: UserService,
    private creditService: CreditRequestService
  ) {
    this.currentUser$ = this.store.pipe(select(selectCurrentUser));
  }

  ngOnInit(): void {this.userService.getCurrentUser().subscribe(user => {
    this.creditService.user$.next(user);
    
  });
    
  }
  
  loanType = typeLoans;
  submitCreditRequest(): void {
    this.currentUser$.subscribe(user => {
      if (user) {
        this.creditService.createCreditRequest(this.creditRequest).subscribe(
          response => {
            console.log('Response from server:', response); // Vérifiez la réponse complète du serveur
            console.log('Credit request successful', response);
   
            console.log('Updated credit request:', this.creditRequest); // Vérifiez la mise à jour de creditRequest
            this.creditRequest.amortizationSchedule = response.amortizationSchedule;
            this.showForm = false; // Masquer le formulaire après avoir soumis la demande
            this.creditRequest.status = response.status; // Assurez-vous que response.status est correct
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
