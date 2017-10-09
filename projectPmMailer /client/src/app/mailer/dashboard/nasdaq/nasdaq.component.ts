import { config } from '../../../config/config';
import { Component, OnInit } from '@angular/core';
import {DashboardService} from '../dashboard.service';
import { Router } from '@angular/router'
import {NasdaqService} from '../service/nasdaq.service';
import {tweetSearch} from '../service/tweet.service'
@Component({
  selector: 'app-nasdaq',
  templateUrl: './nasdaq.component.html',
  styleUrls: ['./nasdaq.component.css']
})
export class NasdaqComponent implements OnInit {
config=config;
<<<<<<< HEAD
  constructor(private DashboardService: DashboardService, private router: Router,private nasdaq:NasdaqService,private tweetService:tweetSearch) { }
list:string;
=======
  constructor(private DashboardService: DashboardService, private router: Router,private nasdaq:NasdaqService) { }
nasdaqcode:string;
>>>>>>> 8c033c8af987151f076712c372be4a5f22697242
value:{};
stockprice:string;
stocknews:string;
header:string;

  ngOnInit() {
     this.nasdaq.getnasdaqstocks().subscribe((data) => {

     this.nasdaqcode = data;
     console.log(this.nasdaqcode)
   }, error => {
     console.log("Error" + error)
   })
  }

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
}
