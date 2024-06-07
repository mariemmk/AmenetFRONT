import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ListUsersComponent } from './list-users/list-users.component';


@NgModule({
  declarations: [
  
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
