import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class DashboardService {

  constructor(private http : Http) { }
   //method for logout
   signout()
     {
     	const url = 'http://localhost:3000/api/logout/'
 	return this.http
 							.get(url)
 							.map(res => res,error=>error)
     }
}
