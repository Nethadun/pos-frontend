import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CustomerComponent} from './customer/customer.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ItemComponent} from './item/item.component';
import {OrderFormComponent} from './order-form/order-form.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {LoginFormComponent} from './login-form/login-form.component';
import {MainComponent} from './main/main.component';
import {SideComponent} from './side/side.component';
import {NavComponent} from './nav/nav.component';
import {FilterPipe} from './search-pipe/filter.pipe';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    DashboardComponent,
    ItemComponent,
    OrderFormComponent,
    LoginFormComponent,
    MainComponent,
    SideComponent,
    NavComponent,
    FilterPipe,
    FooterComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
