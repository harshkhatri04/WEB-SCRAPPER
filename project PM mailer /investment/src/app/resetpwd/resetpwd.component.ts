import { Component, OnInit, Input,OnChanges,SimpleChanges} from '@angular/core';
import { FormBuilder,FormGroup,FormControl,Validators} from '@angular/forms'
import { ActivatedRoute } from '@angular/router';

import { ResetpwdService } from './resetpwd.service';

@Component({
  selector: 'app-resetpwd',
  templateUrl: './resetpwd.component.html',
  styleUrls: ['./resetpwd.component.css']
})
export class ResetpwdComponent implements OnInit {

   tkn : any;

  constructor(private ResetpwdService : ResetpwdService, private route : ActivatedRoute){

    this.route.params.subscribe(params => this.tkn = (params.token));
  }

  hero = {pwd: '',cpwd: ''};

  mydata = {}

  form: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      'pwd': new FormControl(this.hero.pwd,[
      	Validators.required,
      	Validators.minLength(8),
      	Validators.maxLength(8)
      	]),
      'cpwd': new FormControl(this.hero.cpwd,[
      	Validators.required,
      	Validators.minLength(8),
      	Validators.maxLength(8)
      	]),
    });
  }
  get pwd() { return this.form.get('pwd'); }
  get cpwd() { return this.form.get('cpwd'); }
  

 reset(resetpwd){
    console.log(resetpwd)
    this.mydata = {
      password : resetpwd
    }
    this.ResetpwdService.resetPassword(this.mydata,this.tkn)
                  .subscribe((res) => {
                      console.log(res)
                      
                  })
                  

  }

}