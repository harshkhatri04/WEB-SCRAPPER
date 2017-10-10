import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, RouterLinkWithHref,RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DebugElement} from '@angular/core';
import { HttpModule } from '@angular/http';

import { CurrencyComponent } from './currency.component';
import {NavbarComponent} from '../navbar/navbar.component';
import {SidebarComponent} from '../sidebar/sidebar.component';
import {CurrencyService} from '../service/currency.service';
import {DashboardService} from '../dashboard.service';
import {TweetService} from '../service/tweet.service';

describe('CurrencyComponent', () => {
  let component: CurrencyComponent;
  let fixture: ComponentFixture<CurrencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
      RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule
      ],
      declarations: [ CurrencyComponent,NavbarComponent,SidebarComponent ],
      providers: [CurrencyService,DashboardService,TweetService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyComponent);
    component = fixture.componentInstance;
  });

  it('should create currency component', () => {
    const currency = fixture.debugElement.componentInstance;
    expect(currency).toBeTruthy();
  });
});
