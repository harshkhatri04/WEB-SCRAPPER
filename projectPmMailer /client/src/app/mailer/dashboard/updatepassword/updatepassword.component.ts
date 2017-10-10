import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';

import { config } from '../../../config/config';
import { SettingsService } from '../settings/settings.service';
import { UpdatepasswordService } from './updatepassword.service';

@Component({
 selector: 'app-updatepassword',
  templateUrl: './updatepassword.component.html',
  styleUrls: ['./updatepassword.component.css']
})
export class UpdatepasswordComponent implements OnInit {
  pwdInfo: FormGroup;
  config = config;
  currentUser: any;
  email: string;
  constructor(
    @Inject(FormBuilder)
    private fbPwd: FormBuilder,
      private updatepasswordService: UpdatepasswordService,
      private settingsService: SettingsService) {

    this.pwdInfo = fbPwd.group({
      currentPwd: ['', [Validators.required]],
      newPwd: ['', [Validators.required]],
      confirmPwd: ['', [Validators.required]],
      email:''
    });
  }

  ngOnInit() {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.email = this.currentUser.email;
  
    this.settingsService.getDataFromDB(this.email)
      .subscribe((res) => {
        let data = {
          email: res.email,
          currentPwd: '',
          confirmPwd: '',
          newPwd:''
        }
           this.displayData(data);
      })
    }

  
  displayData(data: any) {
    this.pwdInfo = this.fbPwd.group({
       email:[data.email],
       currentPwd:[data.currentPwd],
       confirmPwd:[data.confirmPwd],
       newPwd:[data.newPwd]
       })
  }

  updatePwdInfo(pwdInfo,email) {
    let userPwd = {
      currentPwd: pwdInfo.get('currentPwd').value,
      newPwd:pwdInfo.get('newPwd').value,
      confirmPwd:pwdInfo.get('confirmPwd').value
    }
    if(userPwd.newPwd===userPwd.confirmPwd){
    	this.updatepasswordService.updateUserPwd(userPwd,email)
     .subscribe((res)=>{
       console.log(res)
     })
    }
     

  }

}
