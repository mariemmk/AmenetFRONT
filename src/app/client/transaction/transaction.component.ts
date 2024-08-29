import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { TransactionService } from 'src/app/Services/transaction.service';
import { UserService } from 'src/app/Services/user.service';
import { BankAccount } from 'src/app/core/models/BankAccount';
import { transfer } from 'src/app/core/models/Transfer';
import { Client } from 'src/app/core/models/Client';
import { Transaction } from 'src/app/core/models/Transactions';
import { selectCurrentUser } from 'src/app/core/models/user.selectors';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { currentUser } from 'src/app/store/actions/user.action';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  transfer: transfer = new transfer();
  bankAccount!: BankAccount;
  currentUser$: Observable<Client>;
  transactions: Transaction[] = [];
  showTransactions: boolean = false; // Manage visibility
  successMessage: string | null = null;
  errorMessage: string | null = null;
  otpForm!: FormGroup;
  showOtpForm: boolean = false;

  constructor(
    private transactionService: TransactionService,
    private notifications: NotificationsService,
    private userService: UserService,
    private store: Store<any>
  ) { 
    this.currentUser$ = this.store.pipe(select(selectCurrentUser));
  }

  ngOnInit(): void {
    // Retrieve the stored user and access token from localStorage
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    const accessToken = localStorage.getItem('accessToken') || '';

    // Dispatch action to set current user and access token
    if (storedUser && storedUser.idUser && accessToken) {
      this.store.dispatch(currentUser({ user: storedUser, accessToken }));

      // Subscribe to currentUser observable to get the user data
      this.currentUser$.subscribe((user: Client) => {
        if (user && user.idUser) {
          console.log('Current User:', user);

          // Fetch the bank account for the current user
          this.userService.getBankAccounts(user.idUser).pipe(
            catchError(error => {
              console.error('Error fetching bank accounts:', error);
              return of(null); // Handle error gracefully
            })
          ).subscribe((response: BankAccount | null) => {
            if (response) {
              this.bankAccount = response;
              console.log('Bank Accounts Response:', this.bankAccount);

              // Initialize the transfer with the bank account details
              this.transfer.sourceAccountNumber = this.bankAccount.accountNumber;

              // Optionally load transactions here if needed
            } else {
              console.error('No bank account found for the user.');
            }
          });
        } else {
          console.error('No current user found or invalid user id.');
        }
      });
    } else {
      console.error('No user found in localStorage or invalid access token.');
    }
  }

  virementCompteACompte(): void {
    this.transactionService.virementCompteACompte(this.transfer).subscribe(
      response => {
        this.notifications.success('Success', 'Transaction réussie !', {
          timeOut: 5000
        });
        if (this.bankAccount) {
          this.loadTransactions(this.bankAccount.accountNumber);
          this.showTransactions = true; // Show transactions after successful transfer
        }
      },
      error => {
        this.notifications.error('Erreur lors de la transaction', error.message, {
          timeOut: 5000
        });
      }
    );
  }

  loadTransactions(accountNumber: string): void {
    this.transactionService.getTransactionsByAccountNumber(accountNumber).pipe(
      catchError(error => {
        console.error('Error fetching transactions:', error);
        return of([]); // Handle error gracefully
      })
    ).subscribe((transactions: Transaction[]) => {
      this.transactions = transactions;
    });
  }

  toggleView(): void {
    this.showTransactions = !this.showTransactions;
  }
}
