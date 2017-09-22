import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ForgotpasswordService {

  constructor(private http : Http) { }

   forgotPassword(emailId){
   	 //console.log(emailId);
 	//console.log(credentials);
 	const url = 'http://localhost:3000/api/forgot/' + emailId
 	return this.http
 							.get(url)
 							.map(res => res);
 }

}




