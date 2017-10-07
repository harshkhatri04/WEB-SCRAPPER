import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {



	constructor(private http: Http) {} 

	findUser(email, password) {
		//console.log(credentials);
		const url = 'http://localhost:3000/login/signin/' + email + "/" + password;
		return this.http
			.get(url)
			.map(res => res.json(),error=>error);
	}

	//Method for google-auth
	google() {
		const url = 'http://localhost:3000/googleAuth/auth/google'
		return this.http
			.get(url)
			.map(res => res,error=>error.json());
	}
	//Method for google-auth end

	 //Method for facebook-auth
	facebook() {
		const url = 'http://localhost:3000/facebookAuth/auth/facebook'
		return this.http
			.get(url)
			.map(res => res,error=>error.json());
	}
	//Method for facebook-auth end
}
