import { TestBed, async } from '@angular/core/testing';
import { LoginComponent } from './login/login.component'
import { MailerComponent } from './mailer.component';
import { Router, RouterLinkWithHref } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from './login/login.service';
describe('MailerComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,
        FormsModule, ReactiveFormsModule
      ],
      declarations: [
        MailerComponent, LoginComponent
      ],
      providers: [{ provide: LoginService }]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(MailerComponent);
    const mailer = fixture.debugElement.componentInstance;
    expect(mailer).toBeTruthy();
  }))
});
