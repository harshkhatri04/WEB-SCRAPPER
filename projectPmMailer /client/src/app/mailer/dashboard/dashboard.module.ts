import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SettingsComponent } from './settings/settings.component';

const route:Routes=([  {
   path:'settings',
   component:SettingsComponent
 }
 ])
@NgModule({
 imports: [
   CommonModule,
   RouterModule,
    RouterModule.forRoot(route)
 ],
 declarations: [
  SettingsComponent,
   NavbarComponent,
   SidebarComponent
 ],
 exports: [
  SettingsComponent,
   NavbarComponent,
   SidebarComponent
 ]
})
export class DashboardModule { }


