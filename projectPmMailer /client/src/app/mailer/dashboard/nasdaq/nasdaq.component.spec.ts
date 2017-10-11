import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, RouterLinkWithHref,RouterLink } from '@angular/router';
import { DebugElement, ChangeDetectorRef }    from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { NasdaqComponent } from './nasdaq.component';
import {NavbarComponent} from '../navbar/navbar.component';
import { SidebarComponent} from '../sidebar/sidebar.component';
import { DashboardService} from '../dashboard.service';
import { HttpModule } from '@angular/http';
import{ChartsModule as Ng2Charts} from 'ng2-charts';
import { NasdaqService } from '../service/nasdaq.service';
import {TweetService} from '../service/tweet.service';

describe('NasdaqComponent', () => {
  let component: NasdaqComponent;
  let fixture: ComponentFixture<NasdaqComponent>;
  let spy : jasmine.Spy;
  let de:      DebugElement;
  let el:      HTMLElement;
  let destock: DebugElement;
  let elstock: HTMLElement;
  let mockData = ["value of Nasdaq is 360","value of sensex  is 450"];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
      Ng2Charts,
      RouterTestingModule,
      HttpModule
      ],
      declarations: [ NasdaqComponent,NavbarComponent,SidebarComponent],
      providers:[DashboardService,NasdaqService,TweetService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NasdaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
