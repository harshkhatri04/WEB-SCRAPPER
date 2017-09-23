import { Component, OnInit } from '@angular/core';
import {config} from '../../../config/config'
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }
 config: any;
  ngOnInit() {
  	this.getConfig();
  }
  getConfig(){
  	return Promise.resolve(config)
  	.then(data => {
  		this.config=data;
  		console.log(data);
  	})
  }

}
