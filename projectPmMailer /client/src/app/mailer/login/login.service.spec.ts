import { TestBed, fakeAsync, inject } from '@angular/core/testing';
import {
  HttpModule,
  Http,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { LoginService } from './login.service';


describe('LoginService', () => {

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
            { provide: XHRBackend, useClass: MockBackend },
      LoginService]
    });
  });

 

    it('Local login should return login credentials',fakeAsync(
      inject([LoginService, XHRBackend], (loginService, mockBackend) => {
        const mockResponse = { email: "abc@gmail.com", pwd: "12345" };



        mockBackend.connections.subscribe((connection) => {
          console.log(connection,"Coder");
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })));
        });

        loginService.findUser("abc@gmail.com","12345").subscribe((user) => {
          expect(user.email).toEqual('abc@gmail.com');
          expect(user.pwd).toEqual('12345');

        });

      })));

    it('can instantiate service when inject service',
      inject([LoginService], (service: LoginService) => {
        expect(service instanceof LoginService).toBe(true);
      }));




    it('can instantiate service with "new"', inject([Http], (http: Http) => {
      expect(http).not.toBeNull('http should be provided');
      let service = new LoginService(http);
      expect(service instanceof LoginService).toBe(true, 'new service should be ok');
    }));


    it('can provide the mockBackend as XHRBackend',
      inject([XHRBackend], (backend: MockBackend) => {
        expect(backend).not.toBeNull('backend should be provided');
      }));
  });


