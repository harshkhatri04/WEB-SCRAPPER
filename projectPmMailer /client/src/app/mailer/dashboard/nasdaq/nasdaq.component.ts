import { config } from '../../../config/config';
import { Component, OnInit } from '@angular/core';
import {DashboardService} from '../dashboard.service';
import { Router } from '@angular/router'
import {NasdaqService} from '../service/nasdaq.service';

@Component({
  selector: 'app-nasdaq',
  templateUrl: './nasdaq.component.html',
  styleUrls: ['./nasdaq.component.css']
})
export class NasdaqComponent implements OnInit {
config=config;
  constructor(private DashboardService: DashboardService, private router: Router,private nasdaq:NasdaqService) { }
list:any;
value:any;
news:any;
  ngOnInit() {
     this.nasdaq.getnasdaqstocks().subscribe((data) => {

     this.list = data;
     console.log(this.list)
   }, error => {
     console.log("Error" + error)
   })
  }

 search(name) {
   this.value = {
     term: name
   }
   this.nasdaq.getresult().subscribe(res => {
     console.log(res)
     this.news = res.data;
   }, error => {
     console.log("Error" + error)
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
