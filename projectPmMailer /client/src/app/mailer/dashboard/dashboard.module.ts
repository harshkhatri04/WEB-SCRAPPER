import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SettingsComponent } from './settings/settings.component';
import { ChartComponent } from './chart/chart.component';
import {ChartsModule as Ng2Charts} from 'ng2-charts';
import { TweetComponent } from './tweet/tweet.component';
import { NasdaqComponent } from './nasdaq/nasdaq.component';
import { CurrencyComponent } from './currency/currency.component';
import { FundsComponent} from './funds/funds.component';
import {DashboardComponent} from './dashboard.component';




//routes used in this component
const route:Routes=([  {
   path:'settings',
   component:SettingsComponent
 },
  {
   path:'nasdaq',
   component:NasdaqComponent
 },
  {
   path:'currency',
   component:DashboardComponent
 },
  {
   path:'funds',
   component:FundsComponent
 },
 {
   path:'charts',
   component:ChartComponent
 }
 ])

//all the modules and declaration
@NgModule({
 imports: [
   CommonModule,
   RouterModule,
   Ng2Charts,
    RouterModule.forRoot(route)
 ],
 declarations: [
  SettingsComponent,
   NavbarComponent,
   SidebarComponent,
   ChartComponent,
   TweetComponent,
   NasdaqComponent,
   CurrencyComponent,
   FundsComponent
 ],
 exports: [
  SettingsComponent,
   NavbarComponent,
   SidebarComponent,
   NasdaqComponent,
   CurrencyComponent,
   ChartComponent,
   FundsComponent
 ]
})

export class DashboardModule { }