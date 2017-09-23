import { Component, OnInit } from '@angular/core';

import {DashboardService} from '../dashboard.service'
import { Router } from '@angular/router'

import {config} from '../../../config/config'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  constructor(private DashboardService:DashboardService,private router : Router) { }

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

   logout(){
      
              this.DashboardService.signout()
                  .subscribe((res) => {

                  	this.router.navigateByUrl('logout')
                  })


                }

}
