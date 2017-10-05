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
  let deDashboard, deCharts, deSetting: DebugElement;
  let elDashboard, elCharts, elSetting: HTMLElement;

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
    comp = fixture.componentInstance; //Nav Component instance
    deDashboard = fixture.debugElement.query(By.css('.dashboard'));
    elDashboard = deDashboard.nativeElement;
    deCharts = fixture.debugElement.query(By.css('.chart'));
    elCharts = deCharts.nativeElement;
    deSetting = fixture.debugElement.query(By.css('.settings'));
    elSetting = deSetting.nativeElement;
  })

  it('should create navbar component', () => {
    const login = fixture.debugElement.componentInstance;
    expect(login).toBeTruthy();
  });


  it('should display original category value through interpolation of DASHBOARD', () => {
    fixture.detectChanges();
    expect(elDashboard.textContent).toContain(comp.config.sidebar.DASHBOARD);
  });

  it('should display original category value through interpolation of CHARTS', () => {
    fixture.detectChanges();
    expect(elCharts.textContent).toContain(comp.config.sidebar.CHARTS);
  });

  it('should display original category value through interpolation of SETTINGS', () => {
    fixture.detectChanges();
    expect(elSetting.textContent).toContain(comp.config.sidebar.SETTINGS);
  });

})
