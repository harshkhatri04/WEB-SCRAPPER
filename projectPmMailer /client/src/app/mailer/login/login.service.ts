import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { config } from '../../config/config'

@Injectable()
export class LoginService {



	constructor(private http: Http) {} 

	findUser(email, password) {
		//console.log(credentials);
		const url = config.urlToServer.LOGIN_SERVICE_GET + email + "/" + password;
		return this.http
			.get(url)
			.map(res => res.json(),error=>error.json());
	}

	//Method for google-auth
	google() {
		const url = config.urlToServer.LOGIN_SERVICE_GOGGLE_GET
		return this.http
			.get(url)
			.map(res => res,error=>error.json());
	}
	//Method for google-auth end

	 //Method for facebook-auth
	facebook() {
		const url = config.urlToServer.LOGIN_SERVICE_FACEBOOK_GET
		return this.http
			.get(url)
			.map(res => res,error=>error.json());
	}
	//Method for facebook-auth end
}
