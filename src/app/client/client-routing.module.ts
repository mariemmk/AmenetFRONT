import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client.component';
import { DataUserGuard } from '../shared/guard/Data-User.guard';
import { ProfilComponent } from './profil/profil.component';
import { TransactionComponent } from './transaction/transaction.component';
import { CreditRequestComponent } from './credit-request/credit-request.component';



const routes: Routes = [
  {
    path: 'client', component: ClientComponent,
    children: [
      { path:'transaction', component: TransactionComponent },
      {path:'profile', component:ProfilComponent},
      {path:'credit',component:CreditRequestComponent}

     
    ]
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class ClientRoutingModule { }
