import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
/**
 *  FundService class
 */
export class FundService {

  constructor(private http:Http) { }
   
getstockapi:string='http://localhost:3000';


/**
 * [getfund description] getting funds
 */
getfund(){
	 return this.http.get(this.getstockapi+'/postNews/fund')
	      .map(res =>
	        res.json()
	      )

}
}
