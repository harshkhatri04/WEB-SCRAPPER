import { TestBed, inject } from '@angular/core/testing';

import { SettingsService } from './settings.service';


/**
 * [description]
 * @param  {[type]}   'SettingsService' [description]
 * @param  {Function} ()                [description]
 * @return {[type]}                     [description]
 */
describe('SettingsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SettingsService]
    });
  });

  /**
   * [description]
   * @param  {[type]} 'should                   be            created'        [description]
   * @param  {[type]} inject([SettingsService], (service:     SettingsService [description]
   * @return {[type]}                           [description]
   */
  it('should be created', inject([SettingsService], (service: SettingsService) => {
    expect(service).toBeTruthy();
  }));
});
