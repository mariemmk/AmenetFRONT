import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CreditRequestService } from 'src/app/Services/credit-request.service';
import { UserService } from 'src/app/Services/user.service';
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
    carPrise: 0,
    horsePower: 0,
    employeur: '',
    addressEmplyeur: '',
    postOccupe: '',
    revenuMensuels: 0,
    typeContract: '',
    creditEnCours: '',
    cinCard: null,  
    ficheDePaie: null  
  };

  selectedFiles: { [key: string]: File | null } = {};
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

  onFileChange(event: any, field: string): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFiles[field] = file;
    }
  }

  submitCreditRequest(): void {
    if (!this.creditRequest.user) {
      console.error('No user found');
      return;
    }

    if (this.selectedFiles['cinCard'] && this.selectedFiles['ficheDePaie']) {
      const formData: FormData = new FormData();
      formData.append('loanType', this.creditRequest.loanType);
      formData.append('amount', this.creditRequest.amount.toString());
      formData.append('duration', this.creditRequest.duration.toString());
      formData.append('employeur', this.creditRequest.employeur);
      formData.append('addressEmplyeur', this.creditRequest.addressEmplyeur);
      formData.append('postOccupe', this.creditRequest.postOccupe);
      formData.append('revenuMensuels', this.creditRequest.revenuMensuels.toString());
      formData.append('typeContract', this.creditRequest.typeContract);
      formData.append('creditEnCours', this.creditRequest.creditEnCours);

      if (this.creditRequest.carPrise != null) {
        formData.append('carPrise', this.creditRequest.carPrise.toString());
      }
      if (this.creditRequest.horsePower != null) {
        formData.append('horsePower', this.creditRequest.horsePower.toString());
      }

      formData.append('cinCard', this.selectedFiles['cinCard']!);
      formData.append('ficheDePaie', this.selectedFiles['ficheDePaie']!);

      this.creditService.createCreditRequest(this.creditRequest.user.idUser, formData).subscribe(
        response => {
          console.log('Credit request successful', response);
          this.creditRequest.amortizationSchedule = response.amortizationSchedule;
          this.creditRequest.status = response.status;
          this.showForm = false;
        },
        error => {
          console.error('Credit request failed', error);
        }
      );
    } else {
      console.error('CIN Card and Fiche de Paie are required');
    }
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
