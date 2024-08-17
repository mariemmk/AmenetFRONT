import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client.component';
import { DataUserGuard } from '../shared/guard/Data-User.guard';
import { ProfilComponent } from './profil/profil.component';
import { TransactionComponent } from './transaction/transaction.component';
import { CreditRequestComponent } from './credit-request/credit-request.component';
import { ReclamationComponent } from './reclamation/reclamation.component';
import { ChangeComponent } from './change/change.component';
import { BourseComponent } from './bourse/bourse.component';
import { GestionBudgetComponent } from './gestion-budget/gestion-budget.component';



const routes: Routes = [
  {
    path: '', component: ClientComponent, children: [
      { path: 'transaction', component: TransactionComponent },
      { path: 'profile', component: ProfilComponent },
      { path: 'credit', component: CreditRequestComponent },
      { path: 'reclamation', component: ReclamationComponent },
      { path: 'currency', component: ChangeComponent },
      { path: 'bourse', component: BourseComponent },
      { path: 'gestion-budget', component: GestionBudgetComponent }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class ClientRoutingModule { }
