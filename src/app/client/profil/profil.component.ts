// profil.component.ts
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/Services/user.service';
import { BankAccount } from 'src/app/core/models/BankAccount';
import { Client } from 'src/app/core/models/Client';
import { selectCurrentUser } from 'src/app/core/models/user.selectors';
import { currentUser } from 'src/app/store/actions/user.action';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  currentUser$: Observable<Client>;
  bankAccount!: BankAccount;
  phoneNumber: string = '';
  address: string = '';

  isEditing: boolean = false;
  constructor(private store: Store<any>, private userService: UserService) {
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
        this.phoneNumber = user.phoneNumber;
        this.address = user.address;
   
        console.log('Current User:', user);
        this.userService.getBankAccounts(user.idUser).subscribe(response => {
          console.log('Bank Accounts Response:', response);
          this.bankAccount = response;
        }, error => {
          console.error('Error fetching bank accounts:', error);
        });
      } else {
        console.error('No current user found');
      }
    });
  }
  updateContact(): void {
    this.currentUser$.subscribe(user => {
      if (user) {
      this.userService.updateContactDetails(user.idUser, this.phoneNumber, this.address).subscribe(
        (updatedUser) => {
          console.log('Contact details updated successfully', updatedUser);
          // Optionally update the local state or inform the user of success
          this.store.dispatch(currentUser({ user: updatedUser, accessToken: localStorage.getItem('accessToken') || '' }));
        },
        (error) => {
          console.error('Error updating contact details', error);
          // Optionally handle the error
        }
      );
    } else {
      console.error('No user ID found');
    }
  }
)}

downloadPDF(): void {
  const element = document.getElementById('pdfContent'); // Ensure this ID matches the HTML element you want to capture

  if (element) {
    html2canvas(element).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const doc = new jsPDF();
      const imgWidth = 190; // Adjust width based on your needs
      const pageHeight = 295; // A4 page height in mm
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;

      doc.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        doc.addPage();
        doc.addImage(imgData, 'PNG', 10, -heightLeft, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      doc.save('identite-bancaire.pdf');
    }).catch(error => {
      console.error('Error generating PDF', error);
    });
  } else {
    console.error('Element with ID pdfContent not found');
  }
}
}
