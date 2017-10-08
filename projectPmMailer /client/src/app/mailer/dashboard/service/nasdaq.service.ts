	import { Injectable } from '@angular/core';
	import { Http, Response } from '@angular/http';
	@Injectable()
	export class NasdaqService {
	  constructor(private http: Http) {}

	  getstockapi:string='http://localhost:3000';

	  //get the stocks code and company of nasdaq
	  getnasdaqstocks() {
	    return this.http.get(this.getstockapi+'/postNews/details')
	      .map(res =>
	        res.json()
	      )
	  }
	  //get the stocks code and company of nasdaq End

	  //get the news of respective code which was selected in dropdown 
	  // getresult(term) {

	  //   return this.http.post(this.getstockapi+'/postNews', term)
	  //     .map((res: Response) => res.json(),error=>error.json())

	  // }
	  //get the news of respective code which was selected in dropdown
	
  getstock(term) {
	    console.log(term)
	    return this.http.post(this.getstockapi+'/postNews/stock', term)
	      .map((res: Response) => res.json())
	  }

	}
