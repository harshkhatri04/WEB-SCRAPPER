import { Component, OnInit, Input,OnChanges,SimpleChanges} from '@angular/core';
import { FormBuilder,FormGroup,FormControl,Validators} from '@angular/forms'
import {NgForm} from '@angular/forms';

import { ForgotpasswordService } from './forgotpassword.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  constructor(private ForgotpasswordService : ForgotpasswordService) { }

  ngOnInit() {
  }

  forgot(email){
  	//console.log(email)
  	this.ForgotpasswordService.forgotPassword(email)
  	              .subscribe((res) => {
                      console.log(res)
                      
                  })
                  

  }

}
