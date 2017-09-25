import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import { DashboardComponent } from './dashboard.component';
import{browser,element,by} from 'protractor';

describe('LoginComponent', ()=>{


beforeEach(()=>{
    browser.get('http://localhost:4200');
    
})
  it('should pass as user', function(){
    
    element(by.id('search')).click();
    browser.pause();

})
});
