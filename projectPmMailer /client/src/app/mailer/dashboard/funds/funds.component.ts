import { Component, OnInit } from '@angular/core';
import { config } from '../../../config/config';
import { DashboardService } from '../dashboard.service';
import { Router } from '@angular/router';
import { FundService } from '../service/fund.service'
import {TweetService} from '../service/tweet.service';
@Component({
  selector: 'app-funds',
  templateUrl: './funds.component.html',
  styleUrls: ['./funds.component.css']
})
export class FundsComponent implements OnInit {
  config = config;
  fundnews: String;
  investmentProductuser:string;

  constructor(private DashboardService: DashboardService, private router: Router, private fund: FundService,private tweetService:TweetService) {}

  ngOnInit() {
    this.fund.getfund().subscribe((data) => {

      this.fundnews = data;
      console.log(this.fundnews)
    }, error => {
      console.log("Error" + error)
    })
    this.twitfunds();
 }

 twitfunds(){
    
    let user='MutualFundscom';
    this.tweetService.tweetSearch(user).subscribe((data)=>{
          this.investmentProductuser=data;
          console.log(this.investmentProductuser);
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
