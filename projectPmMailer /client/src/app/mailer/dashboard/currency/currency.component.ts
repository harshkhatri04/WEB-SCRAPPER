import { Component, OnInit } from '@angular/core';
import { config } from '../../../config/config';
import { Router } from '@angular/router'

import {TweetService} from '../service/tweet.service';

import {CurrencyService} from '../service/currency.service';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})

export class CurrencyComponent implements OnInit {

 constructor(private currency: CurrencyService, private DashboardService: DashboardService, private router: Router,private tweetService:TweetService) {}

 list: any = []
 data: any

 dat: any = [];


 a: any;
 config = config;
 news: any = [];
 value: any;
 investmentProductuser:string;
 //load dropdown for nasdaq stocks  
 ngOnInit() {
   this.twitwsj();
    this.currency.getcurrency().subscribe((data) => {

     this.list = data;
     console.log(this.list)
   }, error => {
     console.log("Error" + error)
   })
    

 }
 //load dropdown for nasdaq stocks end

 //This function load the news basis of the the stock which was selected in dropdown  
 

 twitwsj(){
    
    let user='WSJmarkets';
    this.tweetService.tweetSearch(user).subscribe((data)=>{
          this.investmentProductuser=data;
          console.log(this.investmentProductuser);
        })
  }

 logout() {
   this.DashboardService.signout()
     .subscribe((res) => {
       localStorage.clear()
       this.router.navigateByUrl('')
     }, error => {
       console.log("Error" + error)
     })
 }

}
