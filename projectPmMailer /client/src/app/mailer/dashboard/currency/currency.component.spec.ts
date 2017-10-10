import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyComponent } from './currency.component';

/**
 * [describe description]
 * @param {[type]} 'CurrencyComponent' [description]
 * @param {[   CurrencyComponent   ]                })    .compileComponents();  }));  beforeEach(() => {    fixture = TestBed.createComponent(CurrencyComponent);    component = fixture.componentInstance;    fixture.detectChanges();  });  it('should be created', () => {    expect(component).toBeTruthy();  });}} () => {  let component [description]
 */
describe('CurrencyComponent', () => {
  let component: CurrencyComponent;
  let fixture: ComponentFixture<CurrencyComponent>;

/**
 * [beforeEach description] configuring component with testing environment
 * @param {[ CurrencyComponent ]    })    .compileComponents();  })} async(() => {    TestBed.configureTestingModule({      declarations [description]
 */
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrencyComponent ]
    })
    .compileComponents();
  }));

/**
 * [beforeEach description] initialising fixtures and component
 * @param {[type]} () => {    fixture = TestBed.createComponent(CurrencyComponent);    component = fixture.componentInstance;    fixture.detectChanges();  } [description]
 */
  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

/**
 * [it description] checlking component creation
 * @param {[type]} 'should be created' [description]
 * @param {[type]} ()      => { expect(component).toBeTruthy();  } [description]
 */
  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
