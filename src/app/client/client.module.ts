import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ProfilComponent } from './profil/profil.component';
import { TransactionComponent } from './transaction/transaction.component';
import { ConfigProfileComponent } from './config-profile/config-profile.component';


@NgModule({
  declarations: [
    ProfilComponent,
    TransactionComponent,
    ConfigProfileComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule
  ]
})
export class ClientModule { }
