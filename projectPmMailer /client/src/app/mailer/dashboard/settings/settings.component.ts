import { Component, OnInit } from '@angular/core';
import { config } from '../../../config/config';


 
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

config=config;
  constructor() { }


  ngOnInit() {
  	// this.getConfig()
  	
  }

  // getConfig():any {
  // 	return Promise.resolve(config)
  // 	.then(data => {
  // 		this.config = data;
  // 		console.log(data)
  // 	})
  // }
}
