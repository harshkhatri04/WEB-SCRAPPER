import { config } from '../../../config/config';
import { Component, OnInit } from '@angular/core';
import {DashboardService} from '../dashboard.service';
import { Router } from '@angular/router'
import {NasdaqService} from '../service/nasdaq.service';
import {TweetService} from '../service/tweet.service';

@Component({
	selector: 'app-nasdaq',
	templateUrl: './nasdaq.component.html',
	styleUrls: ['./nasdaq.component.css']
})
export class NasdaqComponent implements OnInit {



/**
 * [constructor description]
 * @param {DashboardService} private DashboardService [description]
 * @param {Router}           private router           [description]
 * @param {NasdaqService}    private nasdaq           [description]
 * @param {TweetService}     private tweetService     [description]
 */
constructor(private DashboardService: DashboardService, private router: Router,private nasdaq:NasdaqService,private tweetService:TweetService) { }
list:string;
nasdaqcode:number;
config=config;
value:{};
stockprice:string;
stocknews:string;
header:string;
date:any;
stockrate:any=[];
investmentProductuser:string;
listchart:string;
close:any;

/**
 * [ngOnInit description] getting nasdaq stocks data
 */
  ngOnInit() {
     this.nasdaq.getnasdaqstocks().subscribe((data) => {
		 this.nasdaqcode = data;
		 console.log(this.nasdaqcode)
	 }, error => {
		 console.log("Error" + error)
	 })
	}


/**
 * [search description]
 * @param {string} name [description]
 */
 search(name:string) {

	 this.value = {
		 term: name
	 }
	 this.searchnews(name);
	 this.nasdaq.getresult(this.value).subscribe(res => {
		 console.log(res)
		 this.stockprice = res.data;
	 }, error => {
		 console.log("Error" + error)
	 })

 }

/**
 * [searchnews description]
 * @param {string} name [description]
 */
 searchnews(name:string){

	 this.twitnasdaq();
   this.chart(name);
   this.header='NEWS'
	 this.nasdaq.getnews(name).subscribe(res => {
	 this.stocknews = res;
	 }, error => {
		 console.log("Error" + error)
	 })
 }

 /**
  * [twitnasdaq description]
  */
  twitnasdaq(){
    
    let user='nasdaq';
    this.tweetService.tweetSearch(user).subscribe((data)=>{
          this.investmentProductuser=data;
          console.log(this.investmentProductuser);
        })
  }

  /**
   * [logout description]
   */
 logout() {
	 this.DashboardService.signout()
		 .subscribe((res) => {

			 this.router.navigateByUrl('')
		 }, error => {
			 console.log("Error" + error)
		 })
 }

/**
 * [chart description]
 * @param {string} name [description]
 */
chart(name:string) {
  
   this.nasdaq.getchart(name).subscribe(res => {
   this.listchart = res.results;
   for(let i=0;i<this.listchart.length;i++){    
   this.date=new Date(res.results[i].tradingDay);
   // console.log(this.date.getFullYear());
     if(this.date.getFullYear()==2016){
      this.stockrate.push(res.results[i].close)
           }
     }
     console.log(this.stockrate);    
   }, error => {
     console.log("Error" + error)
   })
 }

// lineChart
 public lineChartData= this.stockrate;
 
 /**
  * [lineChartLabels description]
  * @type {Array<any>}
  */
 public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'];
 public lineChartType:string = 'line';


 /**
  * [randomizeType description]
  */
 public randomizeType():void {
   this.lineChartType = this.lineChartType === 'line' ? 'bar' : 'line';
 }

/**
 * [chartClicked description]
 * @param {any} e [description]
 */
 public chartClicked(e:any):void {
   console.log(e);
 }

/**
 * [chartHovered description]
 * @param {any} e [description]
 */
 public chartHovered(e:any):void {
   console.log(e);
 }

}
