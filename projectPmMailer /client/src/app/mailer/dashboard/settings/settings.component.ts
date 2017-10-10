import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';

import { config } from '../../../config/config';
import { SettingsService } from './settings.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})

/**
 * SettingsComponent class
 */
export class SettingsComponent implements OnInit {
  userInfo: FormGroup;
  config = config;
  currentUser: any;
  email: string;
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

  }

}
