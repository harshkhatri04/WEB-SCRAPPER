import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import  { config } from '../../../config/config'

@Injectable()

/**
 * TweetService class
 */
export class TweetService {

  constructor(private http: Http) {}

  /**
   * [tweetSearch description]
   * @param  {[type]} user: string        [description]
   * @return {[type]}       [description]
   */
  tweetSearch(user: string) {
    console.log(user);
    return this.http
      .get(config.urlToServer+'/tweets/user_timeline/' + user)
      .map((res: Response) => res.json());
  }
}
