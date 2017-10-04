
/* import { ComponentFixture, TestBed, async, inject, tick, fakeAsync } from '@angular/core/testing';
 import { By } from '@angular/platform-browser';
 import { DebugElement } from '@angular/core'
 import { LoginComponent } from './login.component'
 import { Router, ActivatedRoute, RouterModule } from '@angular/router';
 import { RouterTestingModule } from '@angular/router/testing';
 import { FormsModule, ReactiveFormsModule } from '@angular/forms'
 import { Http, HttpModule } from '@angular/http';
 import { LoginService } from './login.service'
 import { RouterLinkStubDirective } from '../../../testing/router-stub'

 describe('LoginComponent', () => {
   let spy: jasmine.Spy;
   let component: LoginComponent;
   let fixture: ComponentFixture < LoginComponent > ;
   let de: DebugElement;
   let el: HTMLInputElement;
   let loginservice: LoginService;
   const res = 'sucess';


   beforeEach(async(() => {
     class RouterStub {
       navigateByUrl(url: string) { return url };
     }

     TestBed.configureTestingModule({
       imports: [
         FormsModule,
         ReactiveFormsModule,
         RouterModule,
         HttpModule

       ],
       declarations: [
         LoginComponent
       ],
       providers: [
         { provide: Router, useClass: RouterStub },
         LoginService,

       ],
     }).compileComponents();
   }))

   beforeEach(() => {
     fixture = TestBed.createComponent(LoginComponent);
     console.log('hello')
     component = fixture.componentInstance;
     loginservice = fixture.debugElement.injector.get(LoginService);

     spy = spyOn(loginservice, 'findUser')
       .and.returnValue(res);

     de = fixture.debugElement.query(By.css('.button'));
     el = de.nativeElement;
   })




   it('should login sucessfully', fakeAsync(() => {
     fixture.detectChanges();
     tick();
     fixture.detectChanges();
     expect(el.textContent).toBe(res)
   }))
 })
*/
/*
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import { Router,RouterLinkWithHref } from '@angular/router';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';
import { LoginService } from './login.service';

describe('testing login component',()=>{

  let comp:   LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let de:      DebugElement;
  let el:      HTMLElement;
  let deHeading: DebugElement;
  let elHeading: HTMLElement;
  
  

  //async beforeEach
  beforeEach(async()=>{
    
     TestBed.configureTestingModule({
       imports:[RouterTestingModule,
       FormsModule,ReactiveFormsModule],
       declarations:[LoginComponent], //declaring component to be tested
       providers:[{provide: LoginService}]
     }).compileComponents();
  })

  //sync beforeEach
  beforeEach(()=>{
      fixture=TestBed.createComponent(LoginComponent);
      comp=fixture.componentInstance; //SignUp Component instance
      de = fixture.debugElement.query(By.css('h2'));
      el = de.nativeElement; 
      fixture.detectChanges();
  })


   it('should create Login component', () => {
    const login = fixture.debugElement.componentInstance;
    expect(login).toBeTruthy();
  });
    it('should display original title of carousel', () => {
    //fixture.detectChanges();
    expect(el.textContent).toContain(comp.config.login.STOCK_MARKET);
  });

})*/


import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import { Router,RouterLinkWithHref } from '@angular/router';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';
import { LoginService } from './login.service';

describe('testing sign up component',()=>{

  let comp:   LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let deStock:      DebugElement;
  let elStock:      HTMLElement;
  /*let deHeading: DebugElement;
  let elHeading: HTMLElement;
*/  
  

  //async beforeEach
  beforeEach(async()=>{
    
     TestBed.configureTestingModule({
       imports:[RouterTestingModule,
       FormsModule,ReactiveFormsModule],
       declarations:[LoginComponent], //declaring component to be tested
       providers:[{provide: LoginService}]
     }).compileComponents();
  })

  //sync beforeEach
  beforeEach(()=>{
      fixture=TestBed.createComponent(LoginComponent);

      comp=fixture.componentInstance; //SignUp Component instance
      deStock = fixture.debugElement.query(By.css('p'));
      elStock = deStock.nativeElement; 

      /*deHeading = fixture.debugElement.query(By.css('.text-center'));
      elHeading = deHeading.nativeElement;*/
  })
  
 it('should create SignUp component', () => {
    const login = fixture.debugElement.componentInstance;
    expect(login).toBeTruthy();
  });

 it('should display original category value through interpolation', () => {
    fixture.detectChanges();
    console.log("1 "+elStock.textContent)
    console.log("2 "+comp.config.login.PICTURE_DESCRIPTION_1)
    expect(elStock.textContent).toContain(comp.config.login.PICTURE_DESCRIPTION_1);
  });

/* it('should display original title of carousel', () => {
    fixture.detectChanges();
    expect(elStock.textContent).toContain(comp.config.login.STOCK_MARKET);
  });*/

})