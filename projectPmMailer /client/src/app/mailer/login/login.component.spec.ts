/*import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';

import { DebugElement }    from '@angular/core';


import { Router,RouterModule,ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from  '@angular/forms'
import { LoginComponent } from './login.component';
import { LoginService } from './login.service';

describe('LoginComponent', () => {

  let comp:    LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let de:      DebugElement;
  let el:      HTMLElement;

  // async beforeEach
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
            FormsModule,ReactiveFormsModule,RouterModule
      ],
      declarations: [LoginComponent], // declare the test component
      providers: [{provide: Router},{provide: LoginService},{provide: ActivatedRoute}]

    })
    .compileComponents();  // compile template and css
  }));

  // synchronous beforeEach
  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);

    comp = fixture.componentInstance; // BannerComponent test instance

    // query for the title <h1> by CSS element selector
    de = fixture.debugElement.query(By.css('.stockmarket'));
    el = de.nativeElement;
  });


  it('should be created',() =>{
    expect(comp).toBeTruthy();
  })

  it('should display Access request', () => {
   fixture.detectChanges();
   expect(el.textContent).toContain(comp.config.login.STOCK_MARKET);
 });

  

   
});
*/