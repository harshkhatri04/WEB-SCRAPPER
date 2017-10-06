import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ChartComponent } from './chart.component';
import { NavbarComponent } from './../navbar/navbar.component'
import { DashboardService } from '../dashboard.service'
import { ChartsModule as Ng2Charts } from 'ng2-charts';

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
        Ng2Charts
      ],
      declarations: [ChartComponent, NavbarComponent], //declaring component to be tested
      providers: [{ provide: DashboardService }]
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
