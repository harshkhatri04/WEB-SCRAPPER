import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';

import { config } from '../../../config/config';
import { SettingsService } from './settings.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  userInfo: FormGroup;
  config = config;
 // data: any = {};
  //fb:FormBuilder;
  currentUser: any;
  email: string;
  /* name: string;
 
  mobile: string;
  password: string;
  alternateEmail: string;
  userName:any={};
  userMobile:any={};*/
  constructor(
    @Inject(FormBuilder) private fb: FormBuilder,
    private settingsService: SettingsService) {
    //this.fb=fb;
    this.userInfo = fb.group({
      email: ['', [Validators.required]],
      //status:['',[Validators.required]],
      name: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      alternateEmail: ['', [Validators.required]]

    });
  }


  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.email = this.currentUser.email;
    // get user details from local storage
    this.settingsService.getDataFromDB(this.email)
      .subscribe((res) => {
        let data = {
          email: res.email,
          name: res.name,
          mobile: res.mobile,
          alternateEmail: res.alternateEmail
        }
           this.displayData(data);
      })
    /*let data={
   email:'harsh@gmail',
   name:'harsh',
   mobile:12345567899,
   alternateEmail:'h.khahaha@GMAIL.COM'
    };*/

 
  }

  //
  displayData(data: any) {
    this.userInfo = this.fb.group({
      email: [data.email],
      name: [data.name],
      mobile: [data.mobile],
      alternateEmail: [data.alternateEmail],
    })
  }

  updateUserInfo(userInfo,email) {
    let user = {
      name: userInfo.get('name').value,
      mobile:userInfo.get('mobile').value,
      alternateEmail:userInfo.get('alternateEmail').value
    }
     this.settingsService.updateUser(user,email)
        .subscribe((res)=>{
          console.log(res)
        })
    /*alert(JSON.stringify(user));*/

  }
  /* this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
   //this.name = this.currentUser.name;
   this.email = this.currentUser.email;
   this.mobile = this.currentUser.mobile;
   this.password = this.currentUser.password;
   this.alternateEmail = this.currentUser.alternateEmail;*/
  /*this.settingsService.getDataFromDB(this.email)
    .subscribe((res)=>{
      console.log(res.name)
      this.name=res.name;
      console.log(this.name)

    })
   this.createForm();

  }
/*updateName(name,email){
  this.userName={
    "name":name
  }
  this.settingsService.updateName(this.userName,email)
  .subscribe((res)=>{
     if(res){

      
     }
  })
}

addAlternateEmail(email){
  console.log(email)
}
*/
  /*updateMobile(mobile,email){
    this.userMobile={
      "mobile":mobile
    }
    this.settingsService.updateMobile(this.userMobile,email)
    .subscribe((res)=>{
      if(res){
        console.log(res)
      }
    })
  }

  createForm() {
      this.form = this.formBuilder.group({
        name: [this.name,Validators.required], // <--- the FormControl called "name"
        email:this.email,
        mobil
e:[this.mobile,Validators.required],
        password:this.password,
        alternateEmail:this.alternateEmail
      });
    }*/
}
