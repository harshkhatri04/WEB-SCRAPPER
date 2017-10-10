import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundsComponent } from './funds.component';


/**
 * [describe description]
 * @param {[type]} 'FundsComponent' [description]
 * @param {[   FundsComponent   ]                })    .compileComponents();  }));  beforeEach(() => {    fixture = TestBed.createComponent(FundsComponent);    component = fixture.componentInstance;    fixture.detectChanges();  });  it('should be created', () => {    expect(component).toBeTruthy();  });}} () => {  let component [description]
 */
describe('FundsComponent', () => {
  let component: FundsComponent;
  let fixture: ComponentFixture<FundsComponent>;

  /**
   * configuring module with test environment
   */

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundsComponent ]
    })
    .compileComponents();
  }));


/**
 * [beforeEach description] creating fixtures and components
 * @param {[type]} () => {    fixture = TestBed.createComponent(FundsComponent);    component = fixture.componentInstance;    fixture.detectChanges();  } [description]
 */
  beforeEach(() => {
    fixture = TestBed.createComponent(FundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

/**
 *  checking component creation
 * @param {[type]} 'should be created' [description]
 * @param {[type]} ()      => { expect(component).toBeTruthy();  } [description]
 */
  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
