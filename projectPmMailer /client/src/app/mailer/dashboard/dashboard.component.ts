import { Component, OnInit } from '@angular/core';
import { NasdaqService } from './service/nasdaq.service';
import { config } from '../../config/config';
import { DashboardService } from './dashboard.service'
import { Router } from '@angular/router'
import {CurrencyService} from './service/currency.service';

@Component({
 selector: 'app-dashboard',
 templateUrl: './dashboard.component.html',
 styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

 constructor(private currency: CurrencyService, private DashboardService: DashboardService, private router: Router) {}

 list: any = []
 data: any

 dat: any = [];


 a: any;
 config = config;
 news: any = [];
 value: any;

 //load dropdown for nasdaq stocks  
 ngOnInit() {
    this.currency.getcurrency().subscribe((data) => {

     this.list = data;
     console.log(this.list)
   }, error => {
     console.log("Error" + error)
   })
    this.gettweet();

 }
 //load dropdown for nasdaq stocks end

 //This function load the news basis of the the stock which was selected in dropdown  
 
 logout() {
   this.DashboardService.signout()
     .subscribe((res) => {

       this.router.navigateByUrl('')
     }, error => {
       console.log("Error" + error)
     })
 }

}