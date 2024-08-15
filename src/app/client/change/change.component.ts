import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.css']
})
export class ChangeComponent implements OnInit {
  curencyList: any[] = [];
  selectedCurrency: any;
  amount!: number;
  convertedAmount!: number | null; // Déclaration de convertedAmount ici
  baseCurrency: any; // La devise par défaut (par exemple, DT pour Dinars Tunisiens)

  @Output() currencySelected = new EventEmitter<any>();
  constructor(private userService:UserService , private http:HttpClient){}
  ngOnInit(): void {
   this.getCurrency();
   this.baseCurrency = { Devise: 'DT' }; // Définissez votre devise par défaut ici
   this.amount = 1; // Montant par défaut à convertir
  }

  getCurrency() {
    this.userService.eventsf().subscribe(
      (response: any[]) => {
        this.curencyList = response; // Récupérer la liste des devises
        console.log('Devises récupérées avec succès !', response);
        this.selectedCurrency = this.curencyList[0]; // Sélectionnez la première devise par défaut
        this.updateConversion(); // Mettre à jour la conversion initiale
      },
      error => {
        console.error('Erreur lors de la récupération des devises :', error);
      }
    );
  }
  updateConversion() {
    if (this.selectedCurrency && this.amount) {
      // Calculer le montant converti en utilisant la devise sélectionnée
      const rate = parseFloat(this.selectedCurrency.Achat.replace(',', '.')); // Assurez-vous de traiter le format numérique approprié
      this.convertedAmount = this.amount * rate;
    } else {
      this.convertedAmount = null;
    }
  }

  // Optionnel : si vous voulez afficher le montant converti dans une devise de base différente
  convertToBaseCurrency(amount: number, rate: number): number {
    return amount / rate;
  }


  selectCurrency(currency: any) {
    this.selectedCurrency = currency;
    this.currencySelected.emit(currency);
  }
}

  

