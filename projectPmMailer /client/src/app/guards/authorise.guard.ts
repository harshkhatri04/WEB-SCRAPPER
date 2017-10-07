import { CanActivate,Router } from '@angular/router';
import { Injectable } from '@angular/core';


@Injectable()
export class AuthoriseGuard implements CanActivate{

	constructor(
		private route: Router
				){}

	canActivate(){
		return this.isAuthorised();
	}

	private isAuthorised(): boolean {

		let isAuthorised: boolean= Math.random() < 0.5;
		
		if(!isAuthorised){
		console.log("AuthoriseGuard: The User is not authorised and can not navigate to Dashboard page")
		this.route.navigate(['/login']);
		
		}
		return isAuthorised;
	}
}