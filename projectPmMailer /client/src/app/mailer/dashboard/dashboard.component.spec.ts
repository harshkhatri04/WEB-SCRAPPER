/*import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import { DashboardComponent } from './dashboard.component';
import{browser,element,by} from 'protractor';

describe('LoginComponent', ()=>{


beforeEach(()=>{
    browser.get('http://localhost:4200');
    
})
  it('should pass as user', function(){
        element(by.id('search')).click();
    browser.pause();

})
});
*/

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, ChangeDetectorRef }    from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { FormsModule } from '@angular/forms';
import { By }              from '@angular/platform-browser';
import { Router,RouterLinkWithHref, RouterState,ActivatedRoute, Event } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SidebarComponent} from './sidebar/sidebar.component';
import { NasdaqService } from './service/nasdaq.service';
import { DashboardService} from './dashboard.service';
import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[routerLink]',
  host: {
    '(click)': 'onClick()'
  }
})

export class RouterLinkStubDirective {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;
  onClick() {
    this.navigatedTo = this.linkParams;
  }
}

describe('DashboardComponent', () => {
 let component: DashboardComponent;
 let fixture: ComponentFixture<DashboardComponent>;
 let de:      DebugElement;
 let el:      HTMLElement;
 beforeEach(async(() => {
   TestBed.configureTestingModule({
     imports: [FormsModule],
     declarations: [DashboardComponent, SidebarComponent, RouterLinkStubDirective ],
     providers: [{provide: NasdaqService},{provide: DashboardService},{provide: Router}],
     
   })
   .compileComponents();
 }));

 beforeEach(() => {
   fixture = TestBed.createComponent(DashboardComponent);
   component = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('a'));
    el = de.nativeElement;
    //fixture.detectChanges();
 });

it('should create dashboard component',()=>{
 const dashboard=fixture.debugElement.componentInstance;
 expect(dashboard).toBeTruthy();
});
});