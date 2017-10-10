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
  let deDashboard, deCharts, deSetting, deMailer: DebugElement;
  let elDashboard, elCharts, elSetting, elMailer: HTMLElement;

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
    //For interpolation of DASHBOARD
    deDashboard = fixture.debugElement.query(By.css('.dashboard'));
    elDashboard = deDashboard.nativeElement;
    //For interpolation of CHART
    deCharts = fixture.debugElement.query(By.css('.chart'));
    elCharts = deCharts.nativeElement;
    //For interpolation of SETTINGS
    deSetting = fixture.debugElement.query(By.css('.settings'));
    elSetting = deSetting.nativeElement;
    //For interpolation of MAILER
    deMailer = fixture.debugElement.query(By.css('.mailer'));
    elMailer = deMailer.nativeElement;
  })

  //test case for checking whether navbar is created or not
  it('should create navbar component', () => {
    const navbar = fixture.debugElement.componentInstance;
    expect(navbar).toBeTruthy();
  });

  //test case for checking interpolation of DASHBOARD
  it('should display original category value through interpolation of DASHBOARD', () => {
    fixture.detectChanges();
    expect(elDashboard.textContent).toContain(comp.config.sidebar.DASHBOARD);
  });

  //test case for checking interpolation of CHARTS
  it('should display original category value through interpolation of CHARTS', () => {
    fixture.detectChanges();
    expect(elCharts.textContent).toContain(comp.config.sidebar.CHARTS);
  });

  //test case for checking interpolation of SETTINGS
  it('should display original category value through interpolation of SETTINGS', () => {
    fixture.detectChanges();
    expect(elSetting.textContent).toContain(comp.config.sidebar.SETTINGS);
  });

  //test case for checking interpolation of MAILER
  it('should display original category value through interpolation of MAILER', () => {
    fixture.detectChanges();
    expect(elMailer.textContent).toContain(comp.config.dashboard.PERSONALISED_MAILER);
  });

})
