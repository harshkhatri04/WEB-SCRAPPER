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
  constructor(private DashboardService: DashboardService, private router: Router,private nasdaq:NasdaqService,private tweetService:tweetSearch) { }
list:string;
value:{};
news:string;
stock:string;
head:string;
  ngOnInit() {
     this.nasdaq.getnasdaqstocks().subscribe((data) => {

     this.list = data;
     console.log(this.list)
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
     this.stock = res.data;
   }, error => {
     console.log("Error" + error)
   })
 }

 searchnews(name:string){
this.head='NEWS'
  this.twitnasdaq();
   this.nasdaq.getnews(name).subscribe(res => {
    
     this.news = res;

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
