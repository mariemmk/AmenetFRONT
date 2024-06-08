import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ClientRoutingModule } from './client-routing.module';

import { AppRoutingModule } from '../app-routing.module';
import { AppComponent } from '../app.component';
import { ProfilComponent } from './profil/profil.component';
import { ReclamationComponent } from './reclamation/reclamation.component';
import { ChangeComponent } from './change/change.component';
import { BourseComponent } from './bourse/bourse.component';
import { LoanComponent } from './loan/loan.component';
import { DebitComponent } from './debit/debit.component';


@NgModule({
  declarations: [

  
  
  
    
  
    
  
    LoanComponent,
                              DebitComponent
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
