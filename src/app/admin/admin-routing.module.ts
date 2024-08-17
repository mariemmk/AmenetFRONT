import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountRequestListComponent } from './account-request-list/account-request-list.component';
import { AdminComponent } from './admin.component';
import { DashbordAdminComponent } from './dashbord-admin/dashbord-admin.component';
import { ListCreditsComponent } from './list-credits/list-credits.component';
import { ListReclamationComponent } from './list-reclamation/list-reclamation.component';
import { ListTransactionsComponent } from './list-transactions/list-transactions.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';

const routes: Routes = [  { path: '', component: LoginAdminComponent }, // Default admin route
  {
    path: '', component: AdminComponent, children: [
      { path: 'dashboard', component: DashbordAdminComponent },
      { path: 'list-users', component: ListUsersComponent },
      { path: 'list-credits', component: ListCreditsComponent },
      { path: 'list-transactions', component: ListTransactionsComponent },
      { path: 'list-account-request', component: AccountRequestListComponent },
      { path: 'list-reclamations', component: ListReclamationComponent }
    ]
  },];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
