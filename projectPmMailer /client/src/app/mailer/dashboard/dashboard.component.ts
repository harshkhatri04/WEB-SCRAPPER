import { Component, OnInit } from '@angular/core';
import { NasdaqService } from './service/nasdaq.service';
import { config } from '../../config/config';
import { DashboardService } from './dashboard.service'
import { Router } from '@angular/router'
import {CurrencyService} from './service/currency.service';
import {TweetService} from './service/tweet.service';

@Component({
 selector: 'app-dashboard',
 templateUrl: './dashboard.component.html',
 styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

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
   this.twitinsight();   

 }
 //load dropdown for nasdaq stocks end

 //This function load the news basis of the the stock which was selected in dropdown  
 

 twitinsight(){
    
    let user='Schuldensuehner';
    this.tweetService.tweetSearch(user).subscribe((data)=>{
          this.investmentProductuser=data;
        })
  }
/*logot method*/
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