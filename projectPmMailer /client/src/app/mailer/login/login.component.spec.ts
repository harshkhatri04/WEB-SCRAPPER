/* import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
 import { By } from '@angular/platform-browser';
 import { DebugElement } from '@angular/core'
 import { LoginComponent } from './login.component'
 import { Router, ActivatedRoute } from '@angular/router';
 import { RouterTestingModule } from '@angular/router/testing';
 import { FormsModule, ReactiveFormsModule } from '@angular/forms'

 import { LoginService } from './login.service'
 import { RouterLinkStubDirective } from '../../../testing/router-stub'

 describe('LoginComponent', () => {

   let component: LoginComponent;
   let fixture: ComponentFixture < LoginComponent > ;
   let de: DebugElement;
   let el: HTMLInputElement;

   beforeEach(async(() => {

     class RouterStub {
       navigateByUrl(url: string) { return url; }
     }

     class FakeLoginService {
       res = { success: 'true', token: 'JWT ksahkdbzxckhewkcbashcscdk' };
       findUser() {
         return this.res;
       }
     }
     TestBed.configureTestingModule({
       imports: [
         FormsModule,
         ReactiveFormsModule,
         RouterTestingModule
       ],
       declarations: [
         LoginComponent
       ],
       providers: [
         { provide: Router, useClass: RouterStub },
         { provide: LoginService, useClass: FakeLoginService },
         { provide: ActivatedRoute }

       ]
     }).compileComponents();
   }))

   beforeEach(() => {
     fixture = TestBed.createComponent(LoginComponent);
     console.log('hello')
     component = fixture.componentInstance;
   })

   it('Navigate when local user log in',
     inject([LoginService], (LoginService: LoginService) => {
       component.checkUser('admin@123', 'admin123');
       const spy = spyOn(LoginService, 'findUser');
       de = fixture.debugElement.query(By.css('.button'));
       el = de.nativeElement;
       //el.click();
       //component.login();
       fixture.detectChanges();
       const navArgs = spy.calls.first().args[0];
       expect(navArgs).toBe("/dashboard");
     }));

 })
*/