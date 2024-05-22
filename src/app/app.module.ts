import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LoginComponent } from './shared/login/login.component';
import { SignupComponent } from './shared/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './store/reducers/user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './store/effects/user.effects';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingComponent } from './shared/landing/landing.component';
import { AdminComponent } from './admin/admin.component';

import { ClientComponent } from './client/client.component';
import { ProfilComponent } from './client/profil/profil.component';
import { TransactionComponent } from './client/transaction/transaction.component';
import { SimulatorComponent } from './shared/simulator/simulator.component';


@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        SignupComponent,
        LoginComponent,
        LandingComponent,
        AdminComponent,
        ClientComponent,
        TransactionComponent,
        SimulatorComponent
       
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        RouterModule,
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        StoreModule.forRoot({ user: userReducer }),
        EffectsModule.forRoot([UserEffects]),
        SimpleNotificationsModule.forRoot(),
        AppRoutingModule,
  
        
    ]
})
export class AppModule { }
