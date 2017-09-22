	import { Injectable } from '@angular/core';
	import { Http, Response } from '@angular/http';
	@Injectable()
	export class NasdaqService {
	  constructor(private http: Http) {}
	  getnas() {
	    return this.http.get('http://localhost:3001/getnas/details')
	      .map(res =>
	        res.json()
	      )
	  }
	  getresult(term) {
	    console.log(term)
	    return this.http.post('http://localhost:3001/nasdaq', term)
	      .map((res: Response) => res.json())
	  }
	}
