import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, RouterLinkWithHref } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing'
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
	let component: SidebarComponent;
	let fixture: ComponentFixture<SidebarComponent>;
	 let deChart,deDashboard,deSetting,deMails: DebugElement;
	let elChart,elDashboard,elSetting,elMails: HTMLElement;

	//async beforeEach
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule,
				FormsModule,
				ReactiveFormsModule
			],
			declarations: [ SidebarComponent ]
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

});
