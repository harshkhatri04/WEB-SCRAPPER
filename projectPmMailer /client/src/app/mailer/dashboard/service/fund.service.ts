import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import  { config } from '../../../config/config'

@Injectable()
/**
 *  FundService class
 */
export class FundService {

  constructor(private http:Http) { }

/**
 * [getfund description] getting funds
 */
getfund(){
	 return this.http.get(config.urlToServer+'/postNews/fund')
	      .map(res =>
	        res.json()
	      )

}
}
