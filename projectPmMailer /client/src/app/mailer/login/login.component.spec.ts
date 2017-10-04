<<<<<<< HEAD
 /*import { async, ComponentFixture, TestBed } from '@angular/core/testing';
       									import {RouterModule} from '@angular/router/testing';
       									import { LoginComponent } from './login.component';
       									import{browser,element,by} from 'protractor';

       									describe('LoginComponent', ()=>{


       									 beforeEach(()=>{
       											browser.get('http://localhost:4200');
       											
       									 })
       										it('should pass as user', function(){
       											
       										element(by.id('email')).sendKeys('user@gmail.com');
       										 element(by.id('pwd')).sendKeys('password');
       											element(by.id('loginbutton')).click();
       											browser.pause();

       									 })

       									});*/

 import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
 import { By } from '@angular/platform-browser';
 import { DebugElement } from '@angular/core'
 import { LoginComponent } from './login.component'
 import { Router, RouterModule, ActivatedRoute } from '@angular/router';
 import { FormsModule, ReactiveFormsModule } from '@angular/forms'

 import { LoginService } from './login.service'
 import { RouterLinkStubDirective } from '../../../testing/router-stub'
=======
/*import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';

import { DebugElement }    from '@angular/core';


import { Router,RouterModule,ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from  '@angular/forms'
import { LoginComponent } from './login.component';
import { LoginService } from './login.service';
>>>>>>> 233c5c3be3bd060e3681e68eca858332332effc9

 describe('LoginComponent', () => {

<<<<<<< HEAD
   let component: LoginComponent;
   let fixture: ComponentFixture< LoginComponent > ;
   let de: DebugElement;
   let el: HTMLInputElement;

   beforeEach(async(() => {

     class RouterStub {
       navigateByUrl(url: string) { return url; }
     }

     class FakeLoginService {
       res = { success: 'true', token: 'JWT ksahkdbzxckhewkcbashcscdk' };
       findUser() {
         return this.res;
       }
     }
     TestBed.configureTestingModule({
       imports: [
         FormsModule,
         ReactiveFormsModule,
         RouterModule
       ],
       declarations: [
         LoginComponent
       ],
       providers: [
         { provide: Router, useClass: RouterStub },
         { provide: LoginService, useClass: FakeLoginService },
         { provide: ActivatedRoute }

       ]
     }).compileComponents();
   }))

   beforeEach(() => {
     fixture = TestBed.createComponent(LoginComponent);
     console.log('hello')
     component = fixture.componentInstance;
   })

   it('Navigate when local user log in',
     inject([Router], (router: Router) => {
       component.checkUser('admin@123', 'admin123');
       const spy = spyOn(router, 'navigateByUrl');
       de = fixture.debugElement.query(By.css('.button'));
       el = de.nativeElement;
       //el.click();
       //component.login();
       fixture.detectChanges();
       const navArgs = spy.calls.first().args[0];
       expect(navArgs).toBe("/dashboard");
     }));

 })
=======
  let comp:    LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let de:      DebugElement;
  let el:      HTMLElement;

  // async beforeEach
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
            FormsModule,ReactiveFormsModule,RouterModule
      ],
      declarations: [LoginComponent], // declare the test component
      providers: [{provide: Router},{provide: LoginService},{provide: ActivatedRoute}]

    })
    .compileComponents();  // compile template and css
  }));

  // synchronous beforeEach
  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);

    comp = fixture.componentInstance; // BannerComponent test instance

    // query for the title <h1> by CSS element selector
    de = fixture.debugElement.query(By.css('.stockmarket'));
    el = de.nativeElement;
  });


  it('should be created',() =>{
    expect(comp).toBeTruthy();
  })

  it('should display Access request', () => {
   fixture.detectChanges();
   expect(el.textContent).toContain(comp.config.login.STOCK_MARKET);
 });

  

   
});
*/
>>>>>>> 233c5c3be3bd060e3681e68eca858332332effc9
