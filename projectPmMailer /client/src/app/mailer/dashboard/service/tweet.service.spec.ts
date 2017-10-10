import { TestBed, inject } from '@angular/core/testing';

import { TweetService } from './tweet.service';

describe('TweetService', () => {

  /**
   * [description]
   * @param  {[type]} ( [description]
   * @return {[type]}   [description]
   */
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TweetService]
    });
  });

  /**
   * [description]
   * @param  {[type]} 'should                be            created'     [description]
   * @param  {[type]} inject([TweetService], (service:     TweetService [description]
   * @return {[type]}                        [description]
   */
  it('should be created', inject([TweetService], (service: TweetService) => {
    expect(service).toBeTruthy();
  }));
});
