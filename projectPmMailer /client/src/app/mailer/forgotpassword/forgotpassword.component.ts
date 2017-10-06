import { Component, OnInit, Input,OnChanges,SimpleChanges} from '@angular/core';
import { FormBuilder,FormGroup,FormControl,Validators} from '@angular/forms'
import {NgForm} from '@angular/forms';
import { config } from '../../config/config'
import { ForgotpasswordService } from './forgotpassword.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
 config = config;

  constructor(private ForgotpasswordService : ForgotpasswordService) { }

  hero = {email: ''};
  form: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({ /*Validation functions through regex*/
      
      'email': new FormControl('', [
        Validators.required ||
        Validators.minLength(4),
        Validators.pattern("[^ @]*@[^ @]*")
      ])

    });
  }




  get pwd() { return this.form.get('email'); }
  


  forgot(email){
  	//console.log(email)
  	this.ForgotpasswordService.forgotPassword(email)
  	              .subscribe((res) => {
                      console.log(res)
                      
                  })
                  

  }

}
