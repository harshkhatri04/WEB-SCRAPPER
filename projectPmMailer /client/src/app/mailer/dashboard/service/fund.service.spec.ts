import { TestBed, inject } from '@angular/core/testing';

import { FundService } from './fund.service';

/**
 * configuring module with test environment
 */

describe('FundService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FundService]
    });
  });

  /**
   * [it description] checking component creation
   * @param {[type]}          'should be created' [description]
   * @param {FundService) =>      {                         expect(service).toBeTruthy();  })} inject([FundService], (service [description]
   */
  it('should be created', inject([FundService], (service: FundService) => {
    expect(service).toBeTruthy();
  }));
});
