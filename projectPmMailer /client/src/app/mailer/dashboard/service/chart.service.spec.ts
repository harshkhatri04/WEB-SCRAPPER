import { TestBed, inject } from '@angular/core/testing';

import { ChartService } from './chart.service';

describe('ChartService', () => {

	/**
	 * [beforeEach description] configuring module with test environment
	 * @param {[ChartService]    });  }} () => {    TestBed.configureTestingModule({      providers [description]
	 */
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChartService]
    });
  });

  /**
   * [it description] checking component creation
   * @param {[type]}           'should be created' [description]
   * @param {ChartService) =>      {                         expect(service).toBeTruthy();  })} inject([ChartService], (service [description]
   */
  it('should be created', inject([ChartService], (service: ChartService) => {
    expect(service).toBeTruthy();
  }));
});
