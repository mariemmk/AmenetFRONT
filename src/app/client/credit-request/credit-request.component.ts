import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CreditRequestService } from 'src/app/Services/credit-request.service';
import { Client } from 'src/app/core/models/Client';
import { Credit } from 'src/app/core/models/CreditRequest';
import { typeLoans } from './LoansType';
import { selectCurrentUser } from 'src/app/core/models/user.selectors';
import { currentUser } from 'src/app/store/actions/user.action';
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
    carPrice: 0,
    horsePower: 0,
    employeur: '',
    addressEmplyeur: '',
    postOccupe: '',
    revenuMensuels: 0,
    typeContract: '',
    creditEnCours: '',
    filePath: ''
  };

  loanType = typeLoans;
  showForm: boolean = true;

  constructor(
    private store: Store<any>,
    private creditService: CreditRequestService
  ) {
    this.currentUser$ = this.store.pipe(select(selectCurrentUser));
  }

  ngOnInit(): void {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    const accessToken = localStorage.getItem('accessToken') || '';

    if (storedUser && storedUser.idUser && accessToken) {
      this.store.dispatch(currentUser({ user: storedUser, accessToken }));
    }

    this.currentUser$.subscribe(user => {
      if (user) {
        this.creditRequest.user = user;
        console.log('Current User:', user);
      } else {
        console.error('No current user found');
      }
    });
  }

  submitCreditRequest(): void {
    if (!this.creditRequest.user) {
      console.error('No user found');
      return;
    }

    // Extract the user ID to pass as a parameter
    const userId = this.creditRequest.user.idUser;

    console.log('Credit Request:', this.creditRequest); // Debugging line
  
    this.creditService.createCreditRequest(
      this.creditRequest.loanType,
      this.creditRequest.amount,
      this.creditRequest.duration,
      userId,
      this.creditRequest.carPrice,
      this.creditRequest.horsePower,
      this.creditRequest.employeur,
      this.creditRequest.addressEmplyeur,
      this.creditRequest.postOccupe,
      this.creditRequest.revenuMensuels,
      this.creditRequest.typeContract,
      this.creditRequest.creditEnCours
    ).subscribe(
      response => {
        console.log('Credit request successful', response);
        this.creditRequest = response;
        this.showForm = false;
      },
      error => {
        console.error('Credit request failed', error);
      }
    );
  }

  downloadPDF(): void {
    if (this.bankDetails && this.bankDetails.nativeElement) {
      html2canvas(this.bankDetails.nativeElement).then(canvas => {
        const imgWidth = 208;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save('amortization_schedule.pdf');
      }).catch(error => {
        console.error('Error in html2canvas:', error);
      });
    } else {
      console.error('Element bankDetails not found or not initialized.');
    }
  }
}
