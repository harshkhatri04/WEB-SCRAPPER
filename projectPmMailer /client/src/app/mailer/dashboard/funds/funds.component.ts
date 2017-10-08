import { Component, OnInit } from '@angular/core';
import { config } from '../../../config/config';
import {DashboardService} from '../dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-funds',
  templateUrl: './funds.component.html',
  styleUrls: ['./funds.component.css']
})
export class FundsComponent implements OnInit {
	config=config;
  constructor(private DashboardService: DashboardService, private router: Router) { }

  ngOnInit() {
  }

 logout() {
   this.DashboardService.signout()
     .subscribe((res) => {

       this.router.navigateByUrl('')
     }, error => {
       console.log("Error" + error)
     })
 }
}
