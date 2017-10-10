import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

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
      .get('http://localhost:3000/tweets/user_timeline/' + user)
      .map((res: Response) => res.json());
  }
}
