import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MailerComponent } from './mailer/mailer.component';
import { LoginComponent } from './mailer/login/login.component';
import { SignUpComponent } from './mailer/sign-up/sign-up.component';
import { ForgotPswComponent } from './mailer/forgot-psw/forgot-psw.component';
import { DashboardComponent } from './mailer/dashboard/dashboard.component';
import { LoginService } from './mailer/login/login.service';

import { NasdaqService } from './mailer/dashboard/service/nasdaq.service';
import { DashboardModule } from './mailer/dashboard/dashboard.module';
const route:Routes=([


  {
    path: 'login',
    component: LoginComponent
  },
  {
    path:'signup',
    component:SignUpComponent
  },
  {
    path:'forgot',
    component:ForgotPswComponent

  },
  {
    path:'dashboard',
    component:DashboardComponent
  },
   {
    path:'',component:LoginComponent
  }

])

@NgModule({
  declarations: [
    AppComponent,
    MailerComponent,
    LoginComponent,
    SignUpComponent,
    ForgotPswComponent,
    DashboardComponent
    
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    DashboardModule,
    RouterModule.forRoot(route)
  ],
  providers: [LoginService,NasdaqService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
