import { TestBed, inject } from '@angular/core/testing';

import { CurrencyService } from './currency.service';


/**
 * [description]
 * @param  {[type]}   'CurrencyService' [description]
 * @param  {Function} ()                [description]
 * @return {[type]}                     [description]
 */
describe('CurrencyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurrencyService]
    });
  });

  /**
   * [description]
   * @param  {[type]} 'should                   be            created'        [description]
   * @param  {[type]} inject([CurrencyService], (service:     CurrencyService [description]
   * @return {[type]}                           [description]
   */
  it('should be created', inject([CurrencyService], (service: CurrencyService) => {
    expect(service).toBeTruthy();
  }));
});
