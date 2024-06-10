import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GestionBudgetService } from 'src/app/Services/gestion-budget.service';
import { UserService } from 'src/app/Services/user.service';
import { Client } from 'src/app/core/models/Client';
import { expenses } from 'src/app/core/models/Expense';
import { selectCurrentUser } from 'src/app/core/models/user.selectors';
import { typeExpence } from './typeExpens';

@Component({
  selector: 'app-gestion-budget',
  templateUrl: './gestion-budget.component.html',
  styleUrls: ['./gestion-budget.component.css']
})
export class GestionBudgetComponent implements OnInit{
  
  expenses:expenses = new expenses();

  currentUser$: Observable<Client>;
  constructor(private gestionBudgetService:GestionBudgetService, private store: Store<any>,private userService: UserService){
    this.currentUser$ = this.store.pipe(select(selectCurrentUser));

}


ngOnInit(): void {

    this.userService.getCurrentUser().subscribe(user => {
    this.gestionBudgetService.user$.next(user); });
  }
 
category!:string;
  submitExpense():void{
    this.currentUser$.subscribe(user => {
      if (user) {
        this.gestionBudgetService.addExpense(this.expenses).subscribe(
          response => {
            console.log('Expense successfully added', response);
          },
          error => {
            console.error('expense  failed', error);
          }
        );
      } else {
        console.error('No user found');
      }
    });
  }
  categorys=typeExpence;

}