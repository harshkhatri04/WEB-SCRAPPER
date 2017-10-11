import { TestBed, async, inject } from '@angular/core/testing';
import {
  HttpModule,
  Http,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { SignUpService } from './sign-up.service';


describe('SignUpService', () => {

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        SignUpService,
        { provide: XHRBackend, useClass: MockBackend },
      ]
    });
  });

  describe('addUser()', () => {

    it('add user account',
      inject([SignUpService, XHRBackend], (SignUpService, mockBackend) => {
        const mockResponse = { name: "admin", email: "abc@gmail.com", mobile: "1234567890", pwd: "12345678", cpwd: "12345678" };



        mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })));
        });

        SignUpService.addUser().subscribe((user) => {
          expect(user.name).toEqual('admin');
          expect(user.email).toEqual('abc@gmail.com');
          expect(user.mobile).toEqual('1234567890');
          expect(user.pwd).toEqual('12345678');
          expect(user.cpwd).toEqual('12345678');

        });

      }));

    it('can instantiate service when inject service',
      inject([SignUpService], (service: SignUpService) => {
        expect(service instanceof SignUpService).toBe(true);
      }));




    it('can instantiate service with "new"', inject([Http], (http: Http) => {
      expect(http).not.toBeNull('http should be provided');
      let service = new SignUpService(http);
      expect(service instanceof SignUpService).toBe(true, 'new service should be ok');
    }));


    it('can provide the mockBackend as XHRBackend',
      inject([XHRBackend], (backend: MockBackend) => {
        expect(backend).not.toBeNull('backend should be provided');
      }));
  });


});
