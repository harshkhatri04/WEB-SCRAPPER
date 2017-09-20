import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { MailerComponent } from './mailer/mailer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { RouterModule,Routes }   from '@angular/router';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { ResetpwdComponent } from './resetpwd/resetpwd.component';
import {NasdaqService} from './dashboard/service/nasdaq.service'
import { LoginService } from './login/login.service' 
import { ForgotpasswordService } from './forgotpassword/forgotpassword.service'
import { ResetpwdService } from './resetpwd/resetpwd.service' 
import { RegisterService } from './register/register.service';
import { DashboardComponent } from './dashboard/dashboard.component'
import { DashboardService } from './dashboard/dashboard.service';
import {ChartComponent} from './chart/chart.component'; 
import {ChartsModule as Ng2Charts} from 'ng2-charts';

const route:Routes=([

  {
    path:'',component:LoginComponent
  },
   {
      path:'register',component:RegisterComponent
    },
    {
      path: 'forget',
    component: ForgotpasswordComponent
  },
  {
    path: 'set/:token',
    component: ResetpwdComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path :'dashboard',
    component: DashboardComponent
  },
  {
   path:'chart',
   component: ChartComponent

  }
])

@NgModule({
  declarations: [
    AppComponent,
    MailerComponent,
    LoginComponent,
    RegisterComponent,
    ForgotpasswordComponent,
    ResetpwdComponent,
    DashboardComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
     FormsModule,
     HttpModule,
     ReactiveFormsModule,
     Ng2Charts,
    RouterModule.forRoot(route)
  ],
  providers: [LoginService,ForgotpasswordService,ResetpwdService,RegisterService,DashboardService,NasdaqService],
  bootstrap: [AppComponent]
})
export class AppModule { }
