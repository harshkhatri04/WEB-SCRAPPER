import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { DialogService } from "ng2-bootstrap-modal";
import { config } from '../../config/config';

import {PreferenceComponent} from '../preference/preference.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	constructor(private LoginService: LoginService, private router: Router, private dialogService:DialogService) {}
	value: any;
	hero = { email: '', pwd: '' };
	form: FormGroup;
	config = config;
	emailId:string;
	password:string;
  name:string;
  mobile:any;
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

  }
  get email() { return this.form.get('email'); }

  get pwd() { return this.form.get('pwd'); }

//Method for Local Login with Local Storage
	checkUser(emailID, pwd) {
		this.LoginService.findUser(emailID, pwd)
			.subscribe((res) => { // getting user information from server  
				this.value = res.token;
        this.name = res.name;
        this.emailId = res.email;
        this.mobile = res.mobile;
        this.password = res.password;
      // setting user information in local storage
			localStorage.setItem('currentUser', JSON.stringify({ 
				token: this.value,
				name: this.name,
				email:this.emailId,
				mobile:this.mobile,
				password:this.password
				}));
		  if(this.value)// checking if retrieved token is valid or not
			  this.router.navigateByUrl('dashboard'),
        this.showConfirm()
			else
				alert('Invalid Credentials');
			})
	}



  //Method for google-auth
  loginByGoogle() {
    this.LoginService.google()
      .subscribe((res) => {
        if (res)
          this.router.navigate(["/"]).then(result => { window.location.href = res.url; });
        else {
          this.router.navigateByUrl('login')
        }
      }, error => {
        console.log("Error" + error)
      })
  }


  //Method for facebook-auth   
  loginByFacebook() {
    this.LoginService.facebook()
      .subscribe((res) => {
        if (res)
          this.router.navigate(["/"]).then(result => { window.location.href = res.url; });
        else
          this.router.navigateByUrl('login')
      }, error => {
        console.log("Error" + error)
      })
  }

  //method for preference setting
	showConfirm() {
            let disposable = this.dialogService.addDialog(PreferenceComponent, {
                title:'Confirm title', 
                message:'Confirm message'})
                .subscribe((isConfirmed)=>{
                    //We get dialog result
                    if(isConfirmed) {
                        alert('accepted');
                    }
                    else {
                        alert('declined');
                    }
                });
        }

}
