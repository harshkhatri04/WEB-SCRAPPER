import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MailerComponent } from './mailer/mailer.component';
import { LoginComponent } from './mailer/login/login.component';
import { SignUpComponent } from './mailer/sign-up/sign-up.component';
import { ForgotpasswordComponent } from './mailer/forgotpassword/forgotpassword.component';
import { ResetpwdComponent } from './mailer/resetpwd/resetpwd.component';
import { DashboardComponent } from './mailer/dashboard/dashboard.component';
import { LoginService } from './mailer/login/login.service';
import { ForgotpasswordService } from './mailer/forgotpassword/forgotpassword.service'
import { ResetpwdService } from './mailer/resetpwd/resetpwd.service'
import { NasdaqService } from './mailer/dashboard/service/nasdaq.service';
import { DashboardModule } from './mailer/dashboard/dashboard.module';
import { SignUpService } from './mailer/sign-up/sign-up.service';
import { DashboardService } from './mailer/dashboard/dashboard.service';

const route: Routes = ([{
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignUpComponent
  },
  {
    path: 'forgot',
    component: ForgotpasswordComponent

  },
  {
    path: 'set/:token',
    component: ResetpwdComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'logout',
    component: LoginComponent

  }
])

@NgModule({
  declarations: [
    AppComponent,
    MailerComponent,
    LoginComponent,
    SignUpComponent,
    ForgotpasswordComponent,
    ResetpwdComponent,
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
  providers: [LoginService, ForgotpasswordService, ResetpwdService, DashboardService, NasdaqService, SignUpService],
  bootstrap: [AppComponent]
})
export class AppModule {}
