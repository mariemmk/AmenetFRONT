import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './shared/login/login.component';
import { SignupComponent } from './shared/signup/signup.component';
import { LandingComponent } from './shared/landing/landing.component';
import { ClientComponent } from './client/client.component';
import { ProfilComponent } from './client/profil/profil.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {path: 'signup', component:SignupComponent},
  {path:'Landing', component:LandingComponent},




  {path: 'amennet',component:ClientComponent},
  {path:'profile', component:ProfilComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const Approutes: Routes = routes;
