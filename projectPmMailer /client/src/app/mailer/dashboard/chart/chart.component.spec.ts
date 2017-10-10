import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule as Ng2Charts } from 'ng2-charts';
import { HttpModule } from '@angular/http';

import { ChartComponent } from './chart.component';
import { NavbarComponent } from './../navbar/navbar.component';
import { DashboardService } from '../dashboard.service';
import {SidebarComponent} from '../sidebar/sidebar.component';
import {NasdaqService} from '../service/nasdaq.service';

describe('testing chart component', () => {

  let comp: ChartComponent;
  let fixture: ComponentFixture < ChartComponent > ;

  //async beforeEach
  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        Ng2Charts,
        HttpModule
      ],
      declarations: [ChartComponent, NavbarComponent,NavbarComponent,SidebarComponent], //declaring component to be tested
      providers: [NasdaqService,{ provide: DashboardService }]
    }).compileComponents();
  })

  //sync beforeEach
  beforeEach(() => {
    fixture = TestBed.createComponent(ChartComponent);
    comp = fixture.componentInstance; //Chart Component instance
  })

  //test case for checking whether Chart is created or not
  it('should create chart component', () => {
    const chart = fixture.debugElement.componentInstance;
    expect(chart).toBeTruthy();
  });

})
