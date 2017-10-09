import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
@Injectable()
export class CurrencyService {
 getstockapi:string='http://localhost:3000';
  constructor(private http: Http) { }
getcurrency(){
	 return this.http.get(this.getstockapi+'/postNews/currency')
	      .map(res =>
	        res.json()
	      )

}
}
