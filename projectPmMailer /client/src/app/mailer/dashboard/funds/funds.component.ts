import { Component, OnInit } from '@angular/core';
import { config } from '../../../config/config';
import {DashboardService} from '../dashboard.service';
import { Router } from '@angular/router';
import { FundService} from '../service/fund.service'

@Component({
  selector: 'app-funds',
  templateUrl: './funds.component.html',
  styleUrls: ['./funds.component.css']
})
export class FundsComponent implements OnInit {
	config=config;
  constructor(private DashboardService: DashboardService, private router: Router,private fund:FundService) { }
list:any;
  ngOnInit() {
 this.fund.getfund().subscribe((data) => {

     this.list = data;
     console.log(this.list)
   }, error => {
     console.log("Error" + error)
   })


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
