import { Component, OnInit } from '@angular/core';
import { TransactionService } from 'src/app/Services/transaction.service';
import { Transaction } from 'src/app/core/models/Transactions';

@Component({
  selector: 'app-list-transactions',
  templateUrl: './list-transactions.component.html',
  styleUrls: ['./list-transactions.component.css']
})
export class ListTransactionsComponent implements OnInit{
  loading: boolean = false;
  error: string | null = null;
  constructor(private transactionService:TransactionService){}
transaction :Transaction[]=[]


searchDate: string = '';


searchAccountNumber: string = '';
  ngOnInit(): void {
   this.transactionService.getAllTransactions().subscribe(
    (data: Transaction[]) => {
      this.transaction = data;
      this.loading = false;
    },
    (err) => {
      this.error = 'An error occurred while fetching credit requests.';
      this.loading = false;
    }
  );
  }


  getTransactionsByDate(): void {
    if (this.searchDate) {
      this.loading = true;
      this.transactionService.getTransactionsByDate(this.searchDate).subscribe(
        (data: Transaction[]) => {
          this.transaction = data;
          this.loading = false;
        },
        (error) => {
          this.error = 'Error fetching transactions';
          this.loading = false;
        }
      );
    } else {
      this.transactionService.getAllTransactions(); // If no date is provided, fetch all transactions again
    }
  }


  getTransactionsByAccountNumber(): void {
    if (this.searchAccountNumber) {
      this.loading = true;
      this.transactionService.getTransactionsByAccountNumber(this.searchAccountNumber).subscribe(
        (AccountNumber: Transaction[]) => {
          this.transaction = AccountNumber;
          this.loading = false;
        },
        (error) => {
          this.error = 'Error fetching transactions';
          this.loading = false;
        }
      );
    } else {
      this.transactionService.getAllTransactions(); // If no date is provided, fetch all transactions again
    }
  }
}
