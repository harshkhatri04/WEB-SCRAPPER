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
  let de: DebugElement;
  let el: HTMLElement;

  //async beforeEach
  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [NavbarComponent], //declaring component which has to be tested
      providers: [{ provide: DashboardService }]
    }).compileComponents();
  })

  //sync beforeEach
  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    comp = fixture.componentInstance;
    de = fixture.debugElement.queryAll(By.css('a'));
    el = de.nativeElement;
  })

  it('should create Navbar Component', () => {
    const navbar = fixture.debugElement.componentInstance;
    expect(navbar).toBeTruthy();
  })

  it('should display original category value through interpolation of DASHBOARD', () => {
    fixture.detectChanges();
    expect(el.textContent).toContain(comp.config.sidebar.DASHBOARD);
  });

  it('should display original category value through interpolation of CHARTS', () => {
    fixture.detectChanges();
    expect(el.textContent).toContain(comp.config.sidebar.CHARTS);
  });

  it('should display original category value through interpolation of SETTINGS', () => {
    fixture.detectChanges();
    expect(el.textContent).toContain(comp.config.sidebar.SETTINGS);
  });

});
