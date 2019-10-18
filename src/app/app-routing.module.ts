import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {CustomerComponent} from './customer/customer.component';
import {ItemComponent} from './item/item.component';
import {OrderFormComponent} from './order-form/order-form.component';

import {MainComponent} from './main/main.component';
import {LoginFormComponent} from './login-form/login-form.component';


const routes: Routes = [
  {
    path: 'main', component: MainComponent,
    children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'customer', component: CustomerComponent},
      {path: 'customer/:cid', component: CustomerComponent},
      {path: 'item', component: ItemComponent},
      {path: 'item/:code', component: ItemComponent},
      {path: 'orderForm', component: OrderFormComponent},
      {path: 'orderForm/:code', component: OrderFormComponent}
    ]
  },
  {path: 'loginForm' , component: LoginFormComponent},
  {path: '', redirectTo: '/loginForm', pathMatch: 'full'},

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

export const routingComponents = [DashboardComponent, CustomerComponent, ItemComponent, OrderFormComponent];
