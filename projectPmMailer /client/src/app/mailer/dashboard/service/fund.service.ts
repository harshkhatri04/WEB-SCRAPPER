import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class FundService {

  constructor(private http:Http) { }
   
getstockapi:string='http://localhost:3000';

getfund(){
	 return this.http.get(this.getstockapi+'/postNews/fund')
	      .map(res =>
	        res.json()
	      )

}
}
