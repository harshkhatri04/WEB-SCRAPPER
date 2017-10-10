import { TestBed, fakeAsync, async, inject } from '@angular/core/testing';
import {
  HttpModule,
  Http,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { ChartService } from './chart.service';
describe('ChartService', () => {

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        ChartService,
        { provide: XHRBackend, useClass: MockBackend },
      ]
    });
  });

  it('Chart service should return chart',
    inject([ChartService, XHRBackend], (ChartService, mockBackend) => {
      const mockResponse = { term: 'AAPL' };

      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

      ChartService.search().subscribe((users) => {
        expect(users.term).toEqual('AAPL');

      });

    }));

  it('can instantiate service when inject service',
    inject([ChartService], (service: ChartService) => {
      expect(service instanceof ChartService).toBe(true);
    }));

  it('can instantiate service with "new"', inject([Http], (http: Http) => {
    expect(http).not.toBeNull('http should be provided');
    let service = new ChartService(http);
    expect(service instanceof ChartService).toBe(true, 'new service should be ok');
  }));

  it('can provide the mockBackend as XHRBackend',
    inject([XHRBackend], (backend: MockBackend) => {
      expect(backend).not.toBeNull('backend should be provided');
    }));
});
