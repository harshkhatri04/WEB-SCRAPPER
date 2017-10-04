import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing'
import { Router, RouterLinkWithHref } from '@angular/router';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NavbarComponent } from './navbar.component';
import { DashboardService } from '../dashboard.service'

describe('Testing NavbarComponent', () => {

  let comp: NavbarComponent;
  let fixture: ComponentFixture < NavbarComponent > ;
  let deStock: DebugElement;
  let elStock: HTMLElement;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [NavbarComponent],
      providers: [{ provide: DashboardService }]
    }).compileComponents();
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    comp = fixture.componentInstance;
    deStock = fixture.debugElement.query(By.css('.dashboard'));
    elStock = deStock.nativeElement;
  })

  it('should create Navbar Component', () => {
    const navbar = fixture.debugElement.componentInstance;
    expect(navbar).toBeTruthy();
  })

  it('should display original category value through interpolation', () => {
    fixture.detectChanges();
    console.log("1 " + elStock.textContent)
    console.log("2 " + comp.config.sidebar.DASHBOARD)
    expect(elStock.textContent).toContain(comp.config.sidebar.DASHBOARD);
  });

});
