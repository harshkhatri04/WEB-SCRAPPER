import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ChartService {

  constructor(private http: Http) {}

  /**
   * [search description]
   * @param {[type]} term [description]
   */
  search(term) {
    var api = 'http://marketdata.websol.barchart.com/getHistory.json?apikey=35721129e1bfdd75860694bacc162262&symbol=' + term + '&type=daily&startDate=20160910000000'
    return this.http.get(api)
      .map((res) => res.json())
  }
}
