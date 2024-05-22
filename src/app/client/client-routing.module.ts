import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client.component';
import { DataUserGuard } from '../shared/guard/Data-User.guard';
import { ProfilComponent } from './profil/profil.component';
import { TransactionComponent } from './transaction/transaction.component';



const routes: Routes = [
  {
    path: 'client', // Define the parent route here
    component: ClientComponent,
    children: [
      { path: 'profile', component: ProfilComponent },
      { path: 'transaction', component: TransactionComponent },
    ]
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class ClientRoutingModule { }
