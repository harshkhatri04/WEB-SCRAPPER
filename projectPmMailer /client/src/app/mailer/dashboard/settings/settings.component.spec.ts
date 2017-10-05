import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import { Router,RouterLinkWithHref } from '@angular/router';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component'
import { DashboardService } from '../dashboard.service';

import { SettingsComponent } from './settings.component';
describe('testing Settings component',()=>{

  let comp:   SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;  
   let deStock: DebugElement;
  let elStock: HTMLElement;

  beforeEach(async()=>{
    
     TestBed.configureTestingModule({
       imports:[RouterTestingModule,
       FormsModule,ReactiveFormsModule],
       declarations:[SettingsComponent,NavbarComponent], //declaring component to be tested
        providers:[{provide: DashboardService}]
     }).compileComponents();
  })

    beforeEach(()=>{
      fixture=TestBed.createComponent(SettingsComponent);
      comp=fixture.componentInstance;
       deStock = fixture.debugElement.query(By.css('h3'));
       elStock = deStock.nativeElement;
  })
  
  it('should create Settings component', () => {
    const settings = fixture.debugElement.componentInstance;
    expect(settings).toBeTruthy();
  });

  it('should display original category value through interpolation', () => {
    fixture.detectChanges();
    expect(elStock.textContent).toContain(comp.config.settings.SETTINGS);
  });
  
})