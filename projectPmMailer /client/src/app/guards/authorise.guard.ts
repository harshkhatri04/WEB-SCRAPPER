import { CanActivate,Router } from '@angular/router';
import { Injectable } from '@angular/core';


@Injectable()
export class AuthoriseGuard implements CanActivate{

	public authorised: boolean; 
	public token: any;

	constructor(
		private route: Router
				){}

	canActivate(){
		return this.isAuthorised();
	}

	private isAuthorised(): boolean {

		
		let token = localStorage.getItem('currentUser');
		if(token)
		{
		this.authorised=true;
		}
		else
		{
			this.authorised=false;
			this.route.navigate(['/login']);

		
		}
		return this.authorised;
	}
}