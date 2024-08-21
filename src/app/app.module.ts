import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
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
import { TransactionComponent } from './client/transaction/transaction.component';
import { SimulatorComponent } from './shared/simulator/simulator.component';
import { AutoInvestComponent } from './shared/Simulators/auto-invest/auto-invest.component';
import { PreslaireAmenagementComponent } from './shared/Simulators/preslaire-amenagement/preslaire-amenagement.component';
import { CredimWataniComponent } from './shared/Simulators/credim-watani/credim-watani.component';
import { PlacementComponent } from './shared/Simulators/placement/placement.component';
import { ProfilComponent } from './client/profil/profil.component';
import { CreditRequestComponent } from './client/credit-request/credit-request.component';
import { ReclamationComponent } from './client/reclamation/reclamation.component';
import { EditUserComponent } from './admin/edit-user/edit-user.component';
import { ListUsersComponent } from './admin/list-users/list-users.component';
import { ChangeComponent } from './client/change/change.component';
import { BourseComponent } from './client/bourse/bourse.component';
import { DatePipe } from '@angular/common';
import { ChatbotComponent } from './shared/chatbot/chatbot.component';
import { DashbordAdminComponent } from './admin/dashbord-admin/dashbord-admin.component';
import { ListCreditsComponent } from './admin/list-credits/list-credits.component';
import { ListTransactionsComponent } from './admin/list-transactions/list-transactions.component';
import { GestionBudgetComponent } from './client/gestion-budget/gestion-budget.component';
import { NgChartsModule } from 'ng2-charts';
import { ExpenseComponent } from './client/expense/expense.component';
import { IncomeComponent } from './client/income/income.component';
import { VerifCodeComponent } from './shared/verif-code/verif-code.component';
import { ForgetComponent } from './shared/forget/forget.component';
import { ResetPasswordFormComponent } from './shared/reset-password-form/reset-password-form.component';
import { VerificationCodeTimerComponent } from './shared/verification-code-timer/verification-code-timer.component';
import { AccountRequestListComponent } from './admin/account-request-list/account-request-list.component';
import { ListReclamationComponent } from './admin/list-reclamation/list-reclamation.component';
import { SideBarAdminComponent } from './admin/side-bar-admin/side-bar-admin.component';
import { LoginAdminComponent } from './admin/login-admin/login-admin.component';

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
    SimulatorComponent,
    AutoInvestComponent,
    PreslaireAmenagementComponent,
    CredimWataniComponent,
    PlacementComponent,
    ProfilComponent,
    CreditRequestComponent,
    ReclamationComponent,
    EditUserComponent,
    ListUsersComponent,
    ChangeComponent,
    BourseComponent,
    ChatbotComponent,
    DashbordAdminComponent,
    ListCreditsComponent,
    ListTransactionsComponent,
    GestionBudgetComponent,
    ListReclamationComponent,
    ForgetComponent,
    VerifCodeComponent,
    ResetPasswordFormComponent,
    VerificationCodeTimerComponent,
    AccountRequestListComponent,
    ExpenseComponent,
    IncomeComponent,
    SideBarAdminComponent,
    LoginAdminComponent
  ],
  providers: [
    DatePipe // Add DatePipe to providers
  ],
  bootstrap: [AppComponent , GestionBudgetComponent , IncomeComponent],
  imports: [
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
    NgChartsModule,
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
