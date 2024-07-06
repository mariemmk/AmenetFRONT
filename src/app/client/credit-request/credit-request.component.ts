import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CreditRequestService } from 'src/app/Services/credit-request.service';
import { UserService } from 'src/app/Services/user.service';
import { Client } from 'src/app/core/models/Client';
import { Credit } from 'src/app/core/models/CreditRequest';
import { selectCurrentUser } from 'src/app/core/models/user.selectors';
import { typeLoans } from './LoansType';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
@Component({
  selector: 'app-credit-request',
  templateUrl: './credit-request.component.html',
  styleUrls: ['./credit-request.component.css']
})
export class CreditRequestComponent implements OnInit {
  @ViewChild('bankDetails', { static: false }) bankDetails!: ElementRef;

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
    user: null,
    amortizationSchedule: [],
    carPrise: 0,
    horsePower: 0,
  };
  showForm: boolean = true;
  loanType = typeLoans;

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
    });
  }

  submitCreditRequest(): void {
    this.currentUser$.subscribe(user => {
      if (user) {
        this.creditService.createCreditRequest(this.creditRequest).subscribe(
          response => {
            console.log('Response from server:', response);
            console.log('Credit request successful', response);
            this.creditRequest.amortizationSchedule = response.amortizationSchedule;
            this.showForm = false;
            this.creditRequest.status = response.status;
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

  downloadPDF(): void {
    if (this.bankDetails && this.bankDetails.nativeElement) {
      html2canvas(this.bankDetails.nativeElement).then((canvas) => {
        const imgWidth = 208; // Largeur de l'image PDF
        const imgHeight = canvas.height * imgWidth / canvas.width;
  
        // Réduire l'échelle de l'image si nécessaire
        const scaleFactor = 1.5; // Ajuster selon vos besoins
        const scaledWidth = imgWidth * scaleFactor;
        const scaledHeight = imgHeight * scaleFactor;
  
        const pdf = new jsPDF('p', 'mm', 'a4');
        const position = 0;
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, scaledWidth, scaledHeight);
        pdf.save('amortization_schedule.pdf');
      }).catch(error => {
        console.error('Error in html2canvas:', error);
      });
    } else {
      console.error('Element bankDetails not found or not initialized.');
    }
  }
  
  
}
