	import { Injectable } from '@angular/core';
	import { Http, Response } from '@angular/http';
	@Injectable()
	export class NasdaqService {
	  constructor(private http: Http) {}

	  getstockapi: string = 'http://localhost:3000';

	  //get the stocks code and company of nasdaq
	  getnasdaqstocks() {
	    return this.http.get(this.getstockapi + '/postNews/details')
	      .map(res =>
	        res.json()
	      )
	  }
	  //get the stocks code and company of nasdaq End

	  //get the news of respective code which was selected in dropdown 
	  getresult(term) {

	    return this.http.post(this.getstockapi + '/postNews/stock/', term)
	      .map((res: Response) => res.json(), error => error.json())

	  }

	  //get the news of respective code which was selected in dropdown
	  getnews(id) {
	    console.log("This sucesss", id)
	    return this.http.get(this.getstockapi + '/postNews/news/' + id)
	      .map((res: Response) => res.json())
	  }

	  //getting charts
	  getchart(term) {
	    console.log('chart', term)
	    var api = 'http://marketdata.websol.barchart.com/getHistory.json?apikey=35721129e1bfdd75860694bacc162262&symbol=' + term + '&type=daily&startDate=20160910000000'
	    return this.http.get(api)
	      .map((res) => res.json())
	  }

	}
