/* import { ComponentFixture, TestBed, async, inject, tick, fakeAsync } from '@angular/core/testing';
 import { By } from '@angular/platform-browser';
 import { DebugElement } from '@angular/core'
 import { LoginComponent } from './login.component'
 import { Router, ActivatedRoute, RouterModule } from '@angular/router';
 import { RouterTestingModule } from '@angular/router/testing';
 import { FormsModule, ReactiveFormsModule } from '@angular/forms'
 import { Http, HttpModule } from '@angular/http';
 import { LoginService } from './login.service'
 import { RouterLinkStubDirective } from '../../../testing/router-stub'

 describe('LoginComponent', () => {
   let spy: jasmine.Spy;
   let component: LoginComponent;
   let fixture: ComponentFixture < LoginComponent > ;
   let de: DebugElement;
   let el: HTMLInputElement;
   let loginservice: LoginService;
   const res = 'sucess';


   beforeEach(async(() => {
     class RouterStub {
       navigateByUrl(url: string) { return url };
     }

     TestBed.configureTestingModule({
       imports: [
         FormsModule,
         ReactiveFormsModule,
         RouterModule,
         HttpModule

       ],
       declarations: [
         LoginComponent
       ],
       providers: [
         { provide: Router, useClass: RouterStub },
         LoginService,

       ],
     }).compileComponents();
   }))

   beforeEach(() => {
     fixture = TestBed.createComponent(LoginComponent);
     console.log('hello')
     component = fixture.componentInstance;
     loginservice = fixture.debugElement.injector.get(LoginService);

     spy = spyOn(loginservice, 'findUser')
       .and.returnValue(res);

     de = fixture.debugElement.query(By.css('.button'));
     el = de.nativeElement;
   })




   it('should login sucessfully', fakeAsync(() => {
     fixture.detectChanges();
     tick();
     fixture.detectChanges();
     expect(el.textContent).toBe(res)
   }))
 })
*/