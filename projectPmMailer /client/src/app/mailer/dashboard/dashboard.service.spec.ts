import { TestBed, async, inject } from '@angular/core/testing';
import { Router } from '@angular/router';
import {
  HttpModule,
  Http,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { DashboardService } from './dashboard.service';
/*import { DashboardComponent } from './dashboard.component';*/
describe('DashboardService', () => {

let routerStub;
  beforeEach(() => {
    routerStub = {
    navigate: jasmine.createSpy('navigate')
    }
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
      { provide: Router, useValue: routerStub },
      {provide: XHRBackend, useClass: MockBackend },
        DashboardService
      ]
    });
  });

 describe('findUser()', () => {

   /* it('Local login should return login credentials',
      inject([DashboardService, XHRBackend], (loginService, mockBackend) => {
        const mockResponse = { email: "abc@gmail.com", pwd: "12345" };



        mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })));
        });

        loginService.findUser().subscribe((user) => {
          expect(user.email).toEqual('abc@gmail.com');
          expect(user.pwd).toEqual('12345');

        });

      }));

    it('can instantiate service when inject service',
    inject([DashboardService], (service: DashboardService) => {
      expect(service instanceof DashboardService).toBe(true);
  }));*/

 it('can instantiate service when inject service',
    inject([DashboardService], (service: DashboardService) => {
      expect(service instanceof DashboardService).toBe(true);
  }));


 it('can instantiate service with "new"', inject([Http], (http: Http) => {
    expect(http).not.toBeNull('http should be provided');
    let service = new DashboardService(http);
    DashboardService  }));


 it('can provide the mockBackend as XHRBackend',
    inject([XHRBackend], (backend: MockBackend) => {
  }));


 it('it should navigate to login after user logs out', () => {
  let component = TestBed.createComponent(DashboardService).componentInstance;
  component.signout();

  expect(routerStub.navigate).toHaveBeenCalledWith(['/login']);
})
  });

   
  });
  

