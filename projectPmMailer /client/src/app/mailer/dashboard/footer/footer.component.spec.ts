import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';

/**
 * [describe description]
 * @param {[type]} 'FooterComponent' [description]
 * @param {[   FooterComponent   ]                })    .compileComponents();  }));  beforeEach(() => {    fixture = TestBed.createComponent(FooterComponent);    component = fixture.componentInstance;    fixture.detectChanges();  });  it('should be created', () => {    expect(component).toBeTruthy();  });}} () => {  let component [description]
 */
describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

/**
 * [beforeEach description] configuring module with testing environment
 * @param {[ FooterComponent ]    })    .compileComponents();  })} async(() => {    TestBed.configureTestingModule({      declarations [description]
 */
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterComponent ]
    })
    .compileComponents();
  }));

/**
 * [beforeEach description] creating fixture and component instance
 * @param {[type]} () => {    fixture = TestBed.createComponent(FooterComponent);    component = fixture.componentInstance;    fixture.detectChanges();  } [description]
 */
  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

/**
 * [it description] checking component creation
 * @param {[type]} 'should be created' [description]
 * @param {[type]} ()      => {                       expect(component).toBeTruthy();  } [description]
 */
  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
