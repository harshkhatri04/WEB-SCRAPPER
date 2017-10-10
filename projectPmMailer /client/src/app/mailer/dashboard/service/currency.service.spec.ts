import { TestBed, fakeAsync,async, inject } from '@angular/core/testing';
import {
  HttpModule,
  Http,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { CurrencyService } from './currency.service';
describe('CurrencyService', () => {

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        CurrencyService,
        { provide: XHRBackend, useClass: MockBackend },
      ]
    });
  });

  it('can instantiate service when inject service',
    inject([CurrencyService], (service: CurrencyService) => {
      expect(service instanceof CurrencyService).toBe(true);
    }));

  it('can instantiate service with "new"', inject([Http], (http: Http) => {
    expect(http).not.toBeNull('http should be provided');
    let service = new CurrencyService(http);
    expect(service instanceof CurrencyService).toBe(true, 'new service should be ok');
  }));

  it('can provide the mockBackend as XHRBackend',
    inject([XHRBackend], (backend: MockBackend) => {
      expect(backend).not.toBeNull('backend should be provided');
    }));
});
