import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/Services/user.service';
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
  bankDetails: string = '';

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
        console.log('Current User:', user);
        this.userService.afficheIdentiteBancaire().subscribe(response => {
          console.log('Bank Details Response:', response);
          this.bankDetails = response;
        }, error => {
          console.error('Error fetching bank details:', error);
        });
      } else {
        console.error('No current user found');
      }
    });
  }

  downloadPDF(): void {
    const DATA = document.getElementById('bankDetails');
    if (DATA) {
      html2canvas(DATA).then((canvas) => {
        const imgWidth = 208;
        const pageHeight = 295;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        const heightLeft = imgHeight;

        const contentDataURL = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const position = 0;
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
        pdf.save('identite_bancaire.pdf');
      });
    }
  }
}
