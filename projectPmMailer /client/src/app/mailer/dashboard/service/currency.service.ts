import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import  { config } from '../../../config/config'

@Injectable()
export class CurrencyService {
  constructor(private http: Http) {}
  /**
   * [getcurrency description] getting currency details
   * @return {[type]} [description]
   */
  getcurrency() {
    return this.http.get(config.urlToServer + '/postNews/currency')
      .map(res =>
        res.json()
      )

  }
}
