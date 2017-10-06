import { async, ComponentFixture, TestBed,fakeAsync, tick } from '@angular/core/testing';
import { Router, RouterLinkWithHref,RouterLink } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing'
import { By } from '@angular/platform-browser';
import { DebugElement,Directive, Injectable, Input  } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './sidebar.component';
import { SpyLocation }         from '@angular/common/testing';
import {Location} from '@angular/common';
import {ChartComponent} from '../chart/chart.component';
import {SettingsComponent} from '../settings/settings.component';
import {DashboardComponent} from '../dashboard.component';
import {NavbarComponent} from '../navbar/navbar.component';
import {ChartsModule as Ng2Charts} from 'ng2-charts';
import {RouterLinkStubDirective} from '../../../../testing/router-stub';
/*import {click} from '../../../../testing/router-stub';*/

describe('SidebarComponent', () => {
	let component: SidebarComponent;
	let fixture: ComponentFixture<SidebarComponent>;
	let location: SpyLocation;
	let links: RouterLinkStubDirective[];
	let linkDes: DebugElement[];
	 let deChart,deDashboard,deSetting,deMails: DebugElement;
	let elChart,elDashboard,elSetting,elMails: HTMLElement;

	//async beforeEach
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule,
				FormsModule,
				Ng2Charts,
				ReactiveFormsModule
			],
			declarations: [ SidebarComponent, ChartComponent,DashboardComponent,SettingsComponent,NavbarComponent,RouterLinkStubDirective]
		})
		.compileComponents();
	}));

//sync beforeEach
	beforeEach(() => {
		fixture = TestBed.createComponent(SidebarComponent);
		component = fixture.componentInstance;

		deChart = fixture.debugElement.query(By.css('.charts'));
		elChart = deChart.nativeElement;

		deDashboard = fixture.debugElement.query(By.css('.dashboard'));
		elDashboard = deDashboard.nativeElement;

		deSetting = fixture.debugElement.query(By.css('.settings'));
		elSetting = deSetting.nativeElement;

		deMails = fixture.debugElement.query(By.css('.mails'));
		elMails = deMails.nativeElement;

		linkDes=fixture.debugElement.queryAll(By.directive(RouterLinkStubDirective));
		links=linkDes.map(de=>de.injector.get(RouterLinkStubDirective)as RouterLinkStubDirective);
    console.log(links);
	});

it('should create Sidebar Component', () => {
		const sidebar = fixture.debugElement.componentInstance;
		expect(sidebar).toBeTruthy();
	})

	 //test case for checking interpolation of DASHBOARD
	it('should display original category value through interpolation of DASHBOARD', () => {
		fixture.detectChanges();
		expect(elDashboard.textContent).toContain(component.config.sidebar.DASHBOARD);
	});

//test case for checking interpolation of SETTING
	it('should display original  value through interpolation of SETTING', () => {
		fixture.detectChanges();
		expect(elSetting.textContent).toContain(component.config.sidebar.SETTINGS);
	});

//test case for checking interpolation of MAILS
	it('should display original  value through interpolation of MAILS', () => {
		fixture.detectChanges();
		expect(elMails.textContent).toContain(component.config.sidebar.MAILS);
	});

//test case for checking interpolation of CHARTS
	it('should display original  value through interpolation of CHARTS', () => {
		fixture.detectChanges();
		expect(elChart.textContent).toContain(component.config.sidebar.CHARTS);
	});

	it('it can get router links from template',()=>{
  expect(links.length).toBe(3,'should have 3 links');
  expect(links[0].linkParams).toBe('/dashboard','1st link should go to dashboard');
  expect(links[1].linkParams).toBe('/settings','2nd link should go to settings');
  expect(links[2].linkParams).toBe('/charts','3rd link should go to charts');
	})

});
