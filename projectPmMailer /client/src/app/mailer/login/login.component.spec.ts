import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, RouterLinkWithHref } from '@angular/router';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { ForgotpasswordComponent } from '../forgotpassword/forgotpassword.component';
import { LoginService } from './login.service';
import {RouterLinkStubDirective} from '../../../testing/router-stub';

describe('testing login component', () => {

  let comp: LoginComponent;
  let fixture: ComponentFixture < LoginComponent > ;
  let links: RouterLinkStubDirective[];
  let linkDes: DebugElement[];
  let deStock: DebugElement;
  let elStock: HTMLElement;

  //async beforeEach
  beforeEach(async() => {

    TestBed.configureTestingModule({
      imports: [RouterTestingModule,
        FormsModule, ReactiveFormsModule
      ],
      declarations: [LoginComponent,SignUpComponent,ForgotpasswordComponent,RouterLinkStubDirective], //declaring component to be tested
      providers: [{ provide: LoginService }]
    }).compileComponents();
  })

  //sync beforeEach
  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    comp = fixture.componentInstance; //SignUp Component instance
    deStock = fixture.debugElement.query(By.css('p'));
    elStock = deStock.nativeElement;


    linkDes=fixture.debugElement.queryAll(By.directive(RouterLinkStubDirective));
    links=linkDes.map(de=>de.injector.get(RouterLinkStubDirective)as RouterLinkStubDirective);
    console.log(links);

  })

  it('should create Login component', () => {
    const login = fixture.debugElement.componentInstance;
    expect(login).toBeTruthy();
  });

  it('should display carousel heading through interpolation', () => {
    fixture.detectChanges();
    expect(elStock.textContent).toContain(comp.config.login.PICTURE_DESCRIPTION_1);
  });


  it('it can get router links from template',()=>{
  expect(links.length).toBe(2,'should have 2 links');
 /* expect(links[0].linkParams).toBe('/dashboard','1st link should go to dashboard');
  expect(links[1].linkParams).toBe('/settings','2nd link should go to settings');
  expect(links[2].linkParams).toBe('/charts','3rd link should go to charts');*/
  })

})
