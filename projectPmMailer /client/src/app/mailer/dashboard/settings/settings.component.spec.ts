import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, RouterLinkWithHref } from '@angular/router';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component'
import { DashboardService } from '../dashboard.service';

import { SettingsComponent } from './settings.component';
describe('Settings component Testing', () => {

  let comp: SettingsComponent;
  let fixture: ComponentFixture < SettingsComponent > ;
  let deSettings, deUpdateName, deAlternateEmail,deUpdatePwd,deMailingPref: DebugElement;
  let elSettings, elUpdateName, elAlternateEmail,elUpdatePwd,elMailingPref: HTMLElement;

  beforeEach(async() => {

    TestBed.configureTestingModule({
      imports: [RouterTestingModule,
        FormsModule, ReactiveFormsModule
      ],
      declarations: [SettingsComponent, NavbarComponent], //declaring component to be tested
      providers: [{ provide: DashboardService }]
    }).compileComponents();
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsComponent);
    comp = fixture.componentInstance;
    deSettings = fixture.debugElement.query(By.css('h3'));
    elSettings = deSettings.nativeElement;
    deUpdateName = fixture.debugElement.query(By.css('.updateName'));
    elUpdateName = deUpdateName.nativeElement;
    deAlternateEmail = fixture.debugElement.query(By.css('.alternateEmail'));
    elAlternateEmail = deAlternateEmail.nativeElement;
    deUpdatePwd = fixture.debugElement.query(By.css('.updatePwd'));
    elUpdatePwd = deUpdatePwd.nativeElement;
    deMailingPref = fixture.debugElement.query(By.css('.mailingPref'));
    elMailingPref = deMailingPref.nativeElement;
  })

  it('should create Settings component', () => {
    const settings = fixture.debugElement.componentInstance;
    expect(settings).toBeTruthy();
  });

  it('should display original category value through interpolation of settings', () => {
    fixture.detectChanges();
    expect(elSettings.textContent).toContain(comp.config.settings.SETTINGS);
  });


  it('should display original category value through interpolation of update name and mobile', () => {
    fixture.detectChanges();
    expect(elUpdateName.textContent).toContain(comp.config.settings.UPDATE_NAME_AND_MOBILE);
  });

  it('should display original category value through interpolation of alternate email', () => {
    fixture.detectChanges();
    expect(elAlternateEmail.textContent).toContain(comp.config.settings.ALTERNATE_EMAIL);
  });

  it('should display original category value through interpolation of Update Password', () => {
    fixture.detectChanges();
    expect(elUpdatePwd.textContent).toContain(comp.config.settings.UPDATE_PASSWORD);
  });

   it('should display original category value through interpolation of Mailing Pref', () => {
    fixture.detectChanges();
    expect(elMailingPref.textContent).toContain('Update Mailing Preferences');
  });

})