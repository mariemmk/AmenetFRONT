import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './shared/login/login.component';
import { SignupComponent } from './shared/signup/signup.component';
import { LandingComponent } from './shared/landing/landing.component';
import { ClientComponent } from './client/client.component';

import { TransactionComponent } from './client/transaction/transaction.component';
import { SimulatorComponent } from './shared/simulator/simulator.component';
import { AutoInvestComponent } from './shared/Simulators/auto-invest/auto-invest.component';
import { PlacementComponent } from './shared/Simulators/placement/placement.component';
import { CredimWataniComponent } from './shared/Simulators/credim-watani/credim-watani.component';
import { PreslaireAmenagementComponent } from './shared/Simulators/preslaire-amenagement/preslaire-amenagement.component';
import { ProfilComponent } from './client/profil/profil.component';
import { CreditRequestComponent } from './client/credit-request/credit-request.component';
import { ReclamationComponent } from './client/reclamation/reclamation.component';
import { AdminComponent } from './admin/admin.component';
import { EditUserComponent } from './admin/edit-user/edit-user.component';
import { ListUsersComponent } from './admin/list-users/list-users.component';
import { ChangeComponent } from './client/change/change.component';
import { BourseComponent } from './client/bourse/bourse.component';
import { DashbordAdminComponent } from './admin/dashbord-admin/dashbord-admin.component';
import { ListCreditsComponent } from './admin/list-credits/list-credits.component';
import { ListTransactionsComponent } from './admin/list-transactions/list-transactions.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {path: 'signup', component:SignupComponent},
  {path:'Landing', component:LandingComponent},
  {path:'simulator', component:SimulatorComponent},
  {path:'Auto', component:AutoInvestComponent},
  {path:'Placement', component:PlacementComponent},
  {path:'Credim', component:CredimWataniComponent},
  {path:'Preslaire', component:PreslaireAmenagementComponent},

  {path:'admin', component:AdminComponent ,  children:[
  
    {path:'ListUser', component:ListUsersComponent},
    {path:'dashbord',component:DashbordAdminComponent},
    {path:'ListCredits',component:ListCreditsComponent},
    {path:'ListTrans',component:ListTransactionsComponent}
   
  ]}, 




 
  {path:'client', component:ClientComponent,
children:[
          {path:'transaction',component:TransactionComponent},
          {path:'profile', component:ProfilComponent},
          {path:'credit',component:CreditRequestComponent},
          {path:'reclamation',component:ReclamationComponent},
          {path:'currency',component:ChangeComponent},
          {path:'Bourse',component:BourseComponent},

         ]
        },




  {path: 'amennet',component:ClientComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const Approutes: Routes = routes;
