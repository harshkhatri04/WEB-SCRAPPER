import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ResetpwdService {

  constructor(private http : Http) { }
   


    resetPassword(password,token){ 
 	const url = 'http://localhost:3000/resetPwd/reset/'+ token;
 	return this.http
 							.post(url,password)
 							.map(res => res.json(),error=>error.json());
 							
 }


}



