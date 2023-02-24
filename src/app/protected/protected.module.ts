import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerListComponent } from './customers/customer-list/customer-list.component';
import { AddCustomerComponent } from './customers/add-customer/add-customer.component';
import { UpdateCustomerComponent } from './customers/update-customer/update-customer.component';
import { CustomerComponent } from './customers/customer/customer.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { UpdateUserComponent } from './users/update-user/update-user.component';
import { ProtectedRoutingModule } from './protected-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';



@NgModule({
  declarations: [
    CustomerListComponent,
    AddCustomerComponent,
    UpdateCustomerComponent,
    CustomerComponent,
    UserListComponent,
    AddUserComponent,
    UpdateUserComponent,
    DashboardComponent,    
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule
  ]
})
export class ProtectedModule { }
