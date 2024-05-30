import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ClientRoutingModule } from './client-routing.module';

import { AppRoutingModule } from '../app-routing.module';
import { AppComponent } from '../app.component';
import { ProfilComponent } from './profil/profil.component';


@NgModule({
  declarations: [

  
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
