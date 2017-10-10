import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import { NgForm } from '@angular/forms';

import { config } from '../../config/config'
import { ForgotpasswordService } from './forgotpassword.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  config = config;
  alert:{
    type:any,
    message:any
  };
 
  constructor(private ForgotpasswordService: ForgotpasswordService) {}

  hero = { email: '' };
  form: FormGroup;
  emailId:string;
  ngOnInit(): void {
    
    this.form = new FormGroup({ /*Validation functions through regex*/

      'email': new FormControl(this.hero.email, [
        Validators.required ||
        Validators.minLength(4),
        Validators.pattern("[^ @]*@[^ @]*")
      ]),

    });
  }

  get email() { return this.form.get('email'); }

  newAlert(type: String, message:String)
  {
    this.alert={
      type:type,
      message:message
    }
  }

  forgot(emailID) {
    this.ForgotpasswordService.forgotPassword(emailID)
      .subscribe((res) => {
        this.emailId = res.email;
         console.log("email sent")
      }, error => {
        this.newAlert('none','email id not correct')
        
        console.log("Error wrong email id" + error)
      })

  }

}
