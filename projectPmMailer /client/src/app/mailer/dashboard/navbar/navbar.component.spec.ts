
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, RouterLinkWithHref } from '@angular/router';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NavbarComponent } from './navbar.component';
import { DashboardService } from '../dashboard.service'

describe('testing navbar component', () => {

  let comp: NavbarComponent;
  let fixture: ComponentFixture < NavbarComponent > ;
  let deStock: DebugElement;
  let elStock: HTMLElement;

  //async beforeEach
  beforeEach(async() => {

    TestBed.configureTestingModule({
      imports: [RouterTestingModule,
        FormsModule, ReactiveFormsModule
      ],
      declarations: [NavbarComponent], //declaring component to be tested
      providers: [{ provide: DashboardService }]
    }).compileComponents();
  })

  //sync beforeEach
  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
      comp=fixture.componentInstance; //SignUp Component instance
      deStock = fixture.debugElement.query(By.css('.dashboard'));
      elStock = deStock.nativeElement;
  })
  
  it('should create navbar component', () => {
    const login = fixture.debugElement.componentInstance;
    expect(login).toBeTruthy();
  });

 it('should display carousel heading through interpolation', () => {
    fixture.detectChanges();
    expect(elStock.textContent).toContain(comp.config.sidebar.DASHBOARD);
  });

})