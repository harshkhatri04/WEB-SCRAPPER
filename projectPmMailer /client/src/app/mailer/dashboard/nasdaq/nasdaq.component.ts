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


	constructor(private DashboardService: DashboardService, private router: Router,private nasdaq:NasdaqService,private tweetService:TweetService) { }
list:string;
nasdaqcode:number;
config=config;
value:{};
stockprice:string;
stocknews:string;
header:string;
investmentProductuser:string;
listchart:{};
  ngOnInit() {
     this.nasdaq.getnasdaqstocks().subscribe((data) => {
		 this.nasdaqcode = data;
		 console.log(this.nasdaqcode)
	 }, error => {
		 console.log("Error" + error)
	 })
	}

 search(name:string) {
/*<<<<<<< HEAD
   this.value = {
     term: name
   }
   this.searchnews(name);
   this.chart(name);
   this.nasdaq.getresult(this.value).subscribe(res => {
     console.log(res)
     this.stockprice = res.data;
   }, error => {
     console.log("Error" + error)
   })
=======*/
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
/*>>>>>>> d350c5491ad1714b1bd76bf61582dbe5af252c9c*/
 }

 searchnews(name:string){

	this.twitnasdaq();

this.header='NEWS'

	 this.nasdaq.getnews(name).subscribe(res => {
		
		 this.stocknews = res;

	 }, error => {
		 console.log("Error" + error)
	 })

 }

	twitnasdaq(){
		let user='nasdaq';
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

chart(name:string) {
 
  
   this.nasdaq.getchart(this.value).subscribe(res => {
     
     this.listchart = res;
     console.log(this.listchart)
   }, error => {
     console.log("Error" + error)
   })
 }


}
