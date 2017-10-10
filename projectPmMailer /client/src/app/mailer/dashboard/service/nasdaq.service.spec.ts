import { async, inject, TestBed } from '@angular/core/testing';

import {
  MockBackend,
  MockConnection
} from '@angular/http/testing';

import { HttpModule, Http, XHRBackend, Response, ResponseOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';

import { NasdaqService as NasdaqService } from './nasdaq.service';


////////  Tests  /////////////
describe('NasdaqService (mockBackend)', () => {

  const makeHeroData = [
    { Code: "asasas", Company: 'Windstorm' }

  ];

  /**
   * [beforeEach description]
   * @param {MockBackend }      ]    });  }} () => {    TestBed.configureTestingModule({      imports [description]
   */
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        NasdaqService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  });

  /**
   * [it description]
   * @param {[type]}            'can instantiate service when inject service' [description]
   * @param {NasdaqService) =>   {                                                     expect(service instanceof NasdaqService).toBe(true);    })} inject([NasdaqService], (service [description]
   */
  it('can instantiate service when inject service',
    inject([NasdaqService], (service: NasdaqService) => {
      expect(service instanceof NasdaqService).toBe(true);
    }));

  /**
   * [it description] mocking the backend
   * @param {[type]}          'can provide the mockBackend as XHRBackend' [description]
   * @param {MockBackend) =>   {                                                   expect(backend).not.toBeNull('backend should be provided');    })} inject([XHRBackend], (backend [description]
   */
  it('can provide the mockBackend as XHRBackend',
    inject([XHRBackend], (backend: MockBackend) => {
      expect(backend).not.toBeNull('backend should be provided');
    }));

  /**
   * [it description] instantiating the service with new
   * @param {[type]}   'can instantiate service with "new"' [description]
   * @param {Http) =>   {                              expect(http).not.toBeNull('http should be provided');    let service = new NasdaqService(http);    expect(service instanceof NasdaqService).toBe(true, 'new service should be ok');  })} inject([Http], (http [description]
   */
  it('can instantiate service with "new"', inject([Http], (http: Http) => {
    expect(http).not.toBeNull('http should be provided');
    let service = new NasdaqService(http);
    expect(service instanceof NasdaqService).toBe(true, 'new service should be ok');
  }));

  /**
   * [it description] getting details method
   * @param {[type]}                          'get details methods' [description]
   * @param {JSON.stringify(mockResponse)                                        })));      });      NasdaqService.getresult().subscribe((nasdaqObj) => {        expect(nasdaqObj.term).toEqual('AADA');      });    })} inject([NasdaqService, XHRBackend], (NasdaqService, mockBackend) => {      const mockResponse = { term [description]
   */
  it('get details methods',
    inject([NasdaqService, XHRBackend], (NasdaqService, mockBackend) => {
      const mockResponse = { term: "AADA" };

      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

      NasdaqService.getresult().subscribe((nasdaqObj) => {
        expect(nasdaqObj.term).toEqual('AADA');
      });

    }));

  /**
   * [description]
   * @param  {[type]}   'when getNasdaq'    [description]
   * @param  {Function} ()    [description]
   * @return {[type]}         [description]
   */
  describe('when getNasdaq', () => {
    it('test getRequest function',
      inject([NasdaqService, XHRBackend], (nasdaqService, mockBackend) => {
        mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(makeHeroData)

          })));
        });

        nasdaqService.getnasdaqstocks().subscribe((nasdaq) => {
          expect(nasdaq[0].Company).toEqual('Windstorm');

        });

      }));
  });

});
