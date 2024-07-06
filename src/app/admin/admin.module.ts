import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { FormsModule } from '@angular/forms';
import { DashbordAdminComponent } from './dashbord-admin/dashbord-admin.component';
import { ListCreditsComponent } from './list-credits/list-credits.component';
import { ListTransactionsComponent } from './list-transactions/list-transactions.component';
import { AccountRequestListComponent } from './account-request-list/account-request-list.component';


@NgModule({
  declarations: [
  
  
 
  

  
  

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule
  ]
})
export class AdminModule { }
