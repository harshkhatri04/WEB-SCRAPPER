import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { config } from '../../config/config';



@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	constructor(private LoginService: LoginService, private router: Router) {}
	value: any;
	hero = { email: '', pwd: '' };
	form: FormGroup;
	config: any;
	
	ngOnInit(): void {
		this.form = new FormGroup({ /*Validation functions through regex*/
			'email': new FormControl(this.hero.email, [
				Validators.required ||
				Validators.minLength(4),
				Validators.pattern("[^ @]*@[^ @]*")
			]),
			'pwd': new FormControl(this.hero.pwd, [
				Validators.required,
				Validators.minLength(4)
			]),
		});

		this.getConfig()
	}
	get email() { return this.form.get('email'); }

	get pwd() { return this.form.get('pwd'); }

	checkUser(emailID, pwd) {
		this.LoginService.findUser(emailID, pwd)
			.subscribe((res) => {
				this.value = res.token;
				if (this.value)
					this.router.navigateByUrl('dashboard')
				else
					console.log('error')
			})
	}

	//Method for google-auth
	loginByGoogle() {
		this.LoginService.google()
			.subscribe((res) => {
				this.router.navigate(["/"]).then(result => { window.location.href = res.url; });
			})
	}

	//Method for facebook-auth   
	loginByFacebook() {
		this.LoginService.facebook()
			.subscribe((res) => {
				this.router.navigateByUrl('dashboard')
			})
	}

	getConfig(): any {
		return Promise.resolve(config)
			.then(data => {
				this.config = data;
				//console.log(data)
			})
	}
}
