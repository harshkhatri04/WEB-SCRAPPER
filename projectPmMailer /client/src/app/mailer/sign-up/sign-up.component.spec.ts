/*
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import { SignUpComponent } from './sign-up.component';
import{browser,element,by} from 'protractor';

describe('LoginComponent', ()=>{


 beforeEach(()=>{
    browser.get('http://localhost:4200');
    
 })
  it('should pass as user', function(){
    
element(by.id('name')).sendKeys('user');
   element(by.id('email')).sendKeys('user@gmail.com');
   element(by.id('mobile')).sendKeys('1111111111');
   element(by.id('pwd')).sendKeys('password');
   element(by.id('cpwd')).sendKeys('password');
    element(by.id('register')).click();
    browser.pause();

 })

});*/

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import { Router,RouterLinkWithHref } from '@angular/router';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { SignUpComponent } from './sign-up.component';
import { SignUpService } from './sign-up.service';

describe('testing sign up component',()=>{

	let comp:   SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let deStock:      DebugElement;
  let elStock:      HTMLElement;
  let deHeading: DebugElement;
  let elHeading: HTMLElement;
  
  
	//async beforeEach
  beforeEach(async()=>{
  	
     TestBed.configureTestingModule({
     	imports:[RouterTestingModule,
     	FormsModule,ReactiveFormsModule],
     	declarations:[SignUpComponent], //declaring component to be tested
     	providers:[{provide: SignUpService}]
     }).compileComponents();
	})

	//sync beforeEach
	beforeEach(()=>{
      fixture=TestBed.createComponent(SignUpComponent);
      comp=fixture.componentInstance; //SignUp Component instance
      deStock = fixture.debugElement.query(By.css('h2'));
      elStock = deStock.nativeElement; 

      deHeading = fixture.debugElement.query(By.css('.text-center'));
      elHeading = deHeading.nativeElement;
	})
  
  it('should create SignUp component', () => {
    const signUp = fixture.debugElement.componentInstance;
    expect(signUp).toBeTruthy();
  });

 

  it('should display text stock',()=>{
		fixture.detectChanges();
     expect(elStock.textContent).toEqual('Stock Market')
	})

	it('should not display text other than Stock Market',()=>{
		fixture.detectChanges();
		expect(elStock.textContent).not.toEqual('Stock');
	})

	it('should display heading register',()=>{
		fixture.detectChanges();
		expect(elHeading.textContent).toEqual('Register');
	})

	it('should not display heading other than register',()=>{
		fixture.detectChanges();
		expect(elHeading.textContent).not.toEqual('Register1');
	})

	
})