import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CreditRequestService } from 'src/app/Services/credit-request.service';
import { Client } from 'src/app/core/models/Client';
import { Credit } from 'src/app/core/models/CreditRequest';
import { DatePipe } from '@angular/common';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-list-credits',
  templateUrl: './list-credits.component.html',
  styleUrls: ['./list-credits.component.css']
})
export class ListCreditsComponent implements OnInit {

  
  credits: Credit[] = [];
  loading: boolean = false;
  error: string | null = null;
  selectedUser: any;
  modalOpen = false;
  constructor(private creditRequestService: CreditRequestService, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.loading = true;

    // Fetch all credit requests
    this.creditRequestService.getAllCreditRequests().subscribe(
      (data: Credit[]) => {
        this.credits = data;
        this.loading = false;
      },
      (error) => {
        this.error = "Failed to load credits";
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

  rejectCredit(creditId: number): void {
    this.creditRequestService.rejectCreditRequest(creditId).subscribe((rejectedCredit) => {
      this.credits = this.credits.map(credit =>
        credit.id === creditId ? rejectedCredit : credit
      );
    });
  }

  consulterUtilisateur(credit: Credit) {
    this.selectedUser = credit.user;
    this.modalOpen = true;

    // Manually trigger modal opening
    const modalElement = document.getElementById('userDetailsModal') as any;
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  getFormattedDate(date?: [number, number, number]): string {
    if (date) {
      return this.datePipe.transform(new Date(date[0], date[1] - 1, date[2]), 'dd-MM-yyyy') || '--';
    }
    return '--';
  }
}
