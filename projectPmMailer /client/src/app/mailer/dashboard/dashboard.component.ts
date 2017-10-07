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
  val: any = ['ETF', 'Bonds', 'Stocks', 'NASDAQ']

  a: any;
  config = config;
  news: any = [];
  value: any;

  //load dropdown for nasdaq stocks  
  ngOnInit() {
    this.nasdaq.getnasdaqstocks().subscribe((data) => {

      this.list = data;
      console.log(this.list)
    }, error => {
      console.log("Error" + error)
    })

  }
  //load dropdown for nasdaq stocks end

  //This function load the news basis of the the stock which was selected in dropdown  
  search(name) {
    this.value = {
      term: name
    }
    this.nasdaq.getresult(this.value).subscribe(res => {
      console.log(res)
      this.news = res.data;
    }, error => {
      console.log("Error" + error)
    })
  }
  
  logout() {
    this.DashboardService.signout()
      .subscribe((res) => {

        this.router.navigateByUrl('logout')
      }, error => {
        console.log("Error" + error)
      })
  }

}
