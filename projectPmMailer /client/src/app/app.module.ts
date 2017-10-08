import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { DialogService } from "ng2-bootstrap-modal";
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';

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
import { SettingsService } from './mailer/dashboard/settings/settings.service';
import { PreferenceComponent } from './mailer/preference/preference.component';
import {PreferenceService} from './mailer/preference/preference.service';

import { AuthoriseGuard} from './guards/authorise.guard';


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
    component: ForgotpasswordComponent,

  },
  {
    path: 'set/:token',
    component: ResetpwdComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthoriseGuard]
  },
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'logout',
    component: LoginComponent

  },
  {
    path: 'preference',
    component: PreferenceComponent
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
    DashboardComponent,
    PreferenceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BootstrapModalModule,
    HttpModule,
    DashboardModule,
     AngularMultiSelectModule,
    RouterModule.forRoot(route)
  ],

 providers: [LoginService,AuthoriseGuard, ForgotpasswordService, ResetpwdService, DashboardService, NasdaqService, SignUpService, DialogService, PreferenceService,SettingsService],


  bootstrap: [AppComponent]
})
export class AppModule {}
