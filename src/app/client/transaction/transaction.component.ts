import { Component } from '@angular/core';
import { TransactionService } from 'src/app/Services/transaction.service';
import { transactionModel } from 'src/app/core/models/TransactionM';
 // Assurez-vous que le chemin est correct

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent {
  transaction: transactionModel = new transactionModel(); // Instanciation d'un objet transactionModel

  constructor(private transactionService: TransactionService) { }

  virementCompteACompte() {
    // Appel de la méthode virementCompteACompte du service avec la transaction en paramètre
    this.transactionService.virementCompteACompte(this.transaction)
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
