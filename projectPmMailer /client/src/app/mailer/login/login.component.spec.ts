
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, RouterLinkWithHref } from '@angular/router';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';
import { LoginService } from './login.service';

describe('testing login component', () => {

  let comp: LoginComponent;
  let fixture: ComponentFixture < LoginComponent > ;
  let deStock: DebugElement;
  let elStock: HTMLElement;

  //async beforeEach
  beforeEach(async() => {

    TestBed.configureTestingModule({
      imports: [RouterTestingModule,
        FormsModule, ReactiveFormsModule
      ],
      declarations: [LoginComponent], //declaring component to be tested
      providers: [{ provide: LoginService }]
    }).compileComponents();
  })

  //sync beforeEach
  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
      comp=fixture.componentInstance; //SignUp Component instance
      deStock = fixture.debugElement.query(By.css('p'));
      elStock = deStock.nativeElement;
  })
  
  it('should create Login component', () => {
    const login = fixture.debugElement.componentInstance;
    expect(login).toBeTruthy();
  });

 it('should display carousel heading through interpolation', () => {
    fixture.detectChanges();
    expect(elStock.textContent).toContain(comp.config.login.PICTURE_DESCRIPTION_1);
  });

})
