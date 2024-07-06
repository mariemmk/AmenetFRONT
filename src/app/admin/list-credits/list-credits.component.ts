import { Component, OnInit } from '@angular/core';
import { CreditRequestService } from 'src/app/Services/credit-request.service';
import { TransactionService } from 'src/app/Services/transaction.service';
import { Credit } from 'src/app/core/models/CreditRequest';

@Component({
  selector: 'app-list-credits',
  templateUrl: './list-credits.component.html',
  styleUrls: ['./list-credits.component.css']
})
export class ListCreditsComponent implements OnInit{
  
credits: Credit[]=[]
loading: boolean = false;
error: string | null = null;
  constructor(private creditRequestService:CreditRequestService){}

  ngOnInit(): void {
    this.loading = true;
    this.creditRequestService.getAllCreditRequests().subscribe(
      (data: Credit[]) => {
        this.credits = data;
        this.loading = false;
      },
      (err) => {
        this.error = 'An error occurred while fetching credit requests.';
        this.loading = false;
      }
    );
  }
  approveCredit(creditId: number): void {
    this.creditRequestService.approveCreditRequest(creditId).subscribe((approvedCredit) => {
      this.credits = this.credits.map(credit =>
        credit.id === creditId ? approvedCredit : credit
      );
    });
  }

  rejectCredit(creditId:number):void{
    this.creditRequestService.rejectCreditRequest(creditId).subscribe((rejectedCredit)=>{
      this.credits=this.credits.map(credit =>
        credit.id ===creditId ? rejectedCredit:credit);
  });
  }

}
