import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class RegisterService {

  constructor(private http : Http) { }

/* findUser(email,password){
 	//console.log(credentials);
 	const url = 'http://localhost:3000/api/signin/' + email + "/" + password;
 	return this.http
 							.get(url)
 							.map(res => res.json());
 }*/

 addUser(user){
 	console.log(user)
 	const url ='http://localhost:3000/api/users';
 	return this.http
 	.post(url,user)
 	.map(res=>res.json());
 } 
}

