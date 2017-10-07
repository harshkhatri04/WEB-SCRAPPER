import { Component, OnInit } from '@angular/core';
import { config } from '../../../config/config';


 
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

config=config;
 currentUser:any;
 name:string;
 email:string;
 mobile:string;
 password:string;
  constructor() { }
      

  ngOnInit() {
       this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
       
       this.name = this.currentUser.name;
       this.email = this.currentUser.email;
       this.mobile = this.currentUser.mobile;
       this.password = this.currentUser.password;
  	
  }


}
