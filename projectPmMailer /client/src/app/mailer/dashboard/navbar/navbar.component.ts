import { Component, OnInit } from '@angular/core';
import {DashboardService} from '../dashboard.service'
import { Router } from '@angular/router'
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private DashboardService:DashboardService,private router : Router) { }

  ngOnInit() {
  }

   logout(){
      
              this.DashboardService.signout()
                  .subscribe((res) => {

                  	this.router.navigateByUrl('logout')
                  })


                }

}
