import {  Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/Services/user.service';
import { Client } from 'src/app/core/models/Client';


import { selectCurrentUser } from 'src/app/core/models/user.selectors';
import { CURRENT_USER } from 'src/app/store/actions/user.action';

@Component({
  selector: 'app-profil',

 
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent  implements OnInit{
 
  currentUser$: Observable<Client>;
  bankDetails: string ='';

  constructor(private store: Store<any>, private userService: UserService) {
    this.currentUser$ = this.store.pipe(select(selectCurrentUser));
  }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(() => {
      this.userService.afficheIdentiteBancaire().subscribe(details => {
        console.log(details)
        this.bankDetails = details;
      });
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




