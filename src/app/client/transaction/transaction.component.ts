import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { TransactionService } from 'src/app/Services/transaction.service';
import { UserService } from 'src/app/Services/user.service';
import { transfer } from 'src/app/core/models/Transfer';
import { selectCurrentUser } from 'src/app/core/models/user.selectors';

 // Assurez-vous que le chemin est correct

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  transfer: transfer = new transfer(); // Instanciation d'un objet transactionModel
  currentUser$: any;

  

  
  constructor(private transactionService: TransactionService , private userService:UserService ,private store: Store<any>) {
    this.currentUser$ = this.store.pipe(select(selectCurrentUser));
   }
   ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(user => {
      this.transactionService.user$.next(user);
      if (user) {
        this.transfer.sourceAccountNumber = user.accountNumber;  // Assume user.name is the property for the client's name
        
      }
    });
  }
  virementCompteACompte() {
    // Appel de la méthode virementCompteACompte du service avec la transaction en paramètre
    this.transactionService.virementCompteACompte(this.transfer)
      .subscribe(
        response => {
          // Traitez la réponse en cas de succès
          console.log('Transaction réussie !', response);
        },
        error => {
          // Traitez l'erreur en cas d'échec
          console.error('Erreur lors de la transaction :', error);
        }
      );
  }
}
