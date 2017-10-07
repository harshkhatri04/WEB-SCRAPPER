import { Component, OnInit } from '@angular/core';
import { NasdaqService } from './service/nasdaq.service';
import { config } from '../../config/config';
import { DashboardService } from './dashboard.service'
import { Router } from '@angular/router'


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  constructor(private nasdaq: NasdaqService, private DashboardService: DashboardService, private router: Router) {}

  list: any = []
  data: any

  dat: any = [];
  val: any = ['ETF', 'Mutual Fund', 'NASDAQ']
listPrice:string;
  a: any;
  config = config;
  news: any = [];
  value: any;
  stocks: any;



  //load dropdown for nasdaq stocks  
  ngOnInit() {

    // this.getConfig();
    this.nasdaq.getnasdaqstocks().subscribe((data) => {
      this.list = data;
      console.log(this.list)
    })

  }
  //load dropdown for nasdaq stocks end

  //This function load the news basis of the the stock which was selected in dropdown  
  search(name) {
    
    this.stock(name);
    this.value = {
      term: name
    }
  //  alert("function1"+this.value);
    this.nasdaq.getresult(this.value).subscribe(res => {
      console.log(res)
      this.news = res.data;
    })

  }

  stock(name: string) {
    
    this.stocks = {
      term: name
    }
    
 this.nasdaq.getstock(this.stocks).subscribe(res => {
console.log("function2"+JSON.stringify(res));
     this.listPrice = res.data;
      //console.log(this.stock)
    })
  }








  //This function load the news basis of the the stock which was selected in dropdown 

  logout() {
    this.DashboardService.signout()
      .subscribe((res) => {

        this.router.navigateByUrl('logout')
      })
  }

}
