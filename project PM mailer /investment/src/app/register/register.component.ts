import { Component, OnInit, Input,OnChanges,SimpleChanges} from '@angular/core';
import { FormBuilder,FormGroup,FormControl,Validators} from '@angular/forms'
import { RegisterService } from './register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 constructor(private RegisterService : RegisterService, private router : Router){}
   hero = {name: '',mobile: '', email: '', pwd: '',cpwd: ''};
 user:any;

  form: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      'name': new FormControl(this.hero.name,[
      	Validators.required,
      	Validators.minLength(3),
      	Validators.pattern("[a-zA-Z]+\\.?")               
      	]),
       'mobile': new FormControl(this.hero.mobile,[
      	Validators.required,
      	Validators.minLength(10),
      	Validators.maxLength(10),
      	Validators.pattern("[0-9]+\\.?")
      	]), 
      'email': new FormControl(this.hero.email, [
        Validators.required ||
        Validators.minLength(4),
        Validators.pattern("[^ @]*@[^ @]*")
        ]),
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
  get name() { return this.form.get('name'); }
  get mobile() { return this.form.get('mobile'); }
  get email() { return this.form.get('email'); }
  get pwd() { return this.form.get('pwd'); }
  get cpwd() { return this.form.get('cpwd'); }
  
  
addUser(name,email,mobile,pwd,cpwd){
  this.user={
    "name":name,
    "email":email,
    "mobile":mobile,
    "password":pwd,
    "confirmPassword":cpwd
  }
              this.RegisterService.addUser(this.user)
                  .subscribe((res) => {
                      console.log(res)
                      if(res)
                        this.router.navigateByUrl('login')
                      //this.value = res.token;
                  })
                  console.log('test successful')
                  console.log('name:'+name+'email'+email+'mobile'+mobile+'pwd'+pwd+'cpwd'+cpwd)
            }


}
