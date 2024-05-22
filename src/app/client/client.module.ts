import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ClientRoutingModule } from './client-routing.module';
import { ProfilComponent } from './profil/profil.component';
import { TransactionComponent } from './transaction/transaction.component';
import { ConfigProfileComponent } from './config-profile/config-profile.component';
import { AppRoutingModule } from '../app-routing.module';
import { AppComponent } from '../app.component';

@NgModule({
  declarations: [
    
    ConfigProfileComponent,

  
  ],   
  providers: [],
  bootstrap: [AppComponent],
  imports: [
    CommonModule,

    HttpClientModule,
    ClientRoutingModule,
    AppRoutingModule,
   
    FormsModule,
  ]
})
export class ClientModule { }
