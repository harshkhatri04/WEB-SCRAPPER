import { TestBed, fakeAsync,async, inject } from '@angular/core/testing';
import {
  HttpModule,
  Http,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { ResetpwdService } from './resetpwd.service';
describe('ResetpwdService', () => {

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        ResetpwdService,
        { provide: XHRBackend, useClass: MockBackend },
      ]
    });
  });

  it('Reset Password should return Password & Token', 
    inject([ResetpwdService, XHRBackend], (ResetpwdService, mockBackend) => {
      const mockResponse = { password:1234,token:'abc' };

      mockBackend.connections.subscribe((connection) => {
        
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

      ResetpwdService.resetPassword().subscribe((user) => {
        expect(user.password).toEqual(1234);
        expect(user.token).toEqual("abc");

      });

    }));

  it('can instantiate service when inject service',
    inject([ResetpwdService], (service: ResetpwdService) => {
      expect(service instanceof ResetpwdService).toBe(true);
    }));

  it('can instantiate service with "new"', inject([Http], (http: Http) => {
    expect(http).not.toBeNull('http should be provided');
    let service = new ResetpwdService(http);
    expect(service instanceof ResetpwdService).toBe(true, 'new service should be ok');
  }));

  it('can provide the mockBackend as XHRBackend',
    inject([XHRBackend], (backend: MockBackend) => {
      expect(backend).not.toBeNull('backend should be provided');
    }));
});
