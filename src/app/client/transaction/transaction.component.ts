import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { TransactionService } from 'src/app/Services/transaction.service';
import { UserService } from 'src/app/Services/user.service';
import { BankAccount } from 'src/app/core/models/BankAccount';
import { transfer } from 'src/app/core/models/Transfer';
import { selectCurrentUser } from 'src/app/core/models/user.selectors';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Client } from 'src/app/core/models/Client';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  transfer: transfer = new transfer();
  bankAccount!: BankAccount;
  currentUser$: Observable<Client>;

  constructor(
    private transactionService: TransactionService,
    private userService: UserService,
    private store: Store<any>
  ) {this.currentUser$ = this.store.pipe(select(selectCurrentUser));}

  ngOnInit(): void {
    this.currentUser$.subscribe((user: Client) => {
      if (user && user.idUser) {
        this.userService.getBankAccounts(user.idUser).pipe(
          catchError(error => {
            console.error('Error fetching bank account:', error);
            return of(null); // Handle error gracefully
          })
        ).subscribe((account: BankAccount | null) => {
          if (account) {
            this.bankAccount = account;
            this.transfer.sourceAccountNumber = this.bankAccount.accountNumber;
          } else {
            console.error('No bank account found for the user.');
          }
        });
      } else {
        console.error('No current user found or invalid user id.');
      }
    });
  }

  virementCompteACompte(): void {
    this.transactionService.virementCompteACompte(this.transfer).subscribe(
      response => {
        console.log('Transaction réussie !', response);
      },
      error => {
        console.error('Erreur lors de la transaction :', error);
      }
    );
  }
}