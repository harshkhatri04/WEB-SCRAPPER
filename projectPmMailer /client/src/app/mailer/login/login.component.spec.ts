import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
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

});