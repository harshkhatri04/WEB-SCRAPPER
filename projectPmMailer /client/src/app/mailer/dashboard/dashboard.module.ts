import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SettingsComponent } from './settings/settings.component';
import { ChartComponent } from './chart/chart.component';
import {ChartsModule as Ng2Charts} from 'ng2-charts';

//routes used in this component
const route:Routes=([  {
   path:'settings',
   component:SettingsComponent
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
 ],
 exports: [
  SettingsComponent,
   NavbarComponent,
   SidebarComponent,
   ChartComponent
 ]
})

export class DashboardModule { }