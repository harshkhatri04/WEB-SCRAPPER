import { Component, OnInit } from '@angular/core';
import {NasdaqService} from './service/nasdaq.service';

@Component({
 selector: 'app-dashboard',
 templateUrl: './dashboard.component.html',
 styleUrls: ['./dashboard.component.css','./animate.min.css','./light-bootstrap-dashboard.css','./demo.css','./pe-icon-7-stroke.css']
})

export class DashboardComponent implements OnInit { 

constructor(private nasdaq:NasdaqService) { }

list:any=[]
data:any
news:any=[];
value:any;   

//load dropdown for nasdaq stocks  
ngOnInit() {      
    this.nasdaq.getnasdaqstocks().subscribe((data)=>{              
    this.list=data;console.log(this.list)    })
}
//load dropdown for nasdaq stocks end
 
 //This function load the news basis of the the stock which was selected in dropdown  
 search(name){
this.value={
    term: name
}    
this.nasdaq.getresult(this.value).subscribe(res=>{
    console.log(res)
    this.news=res.data;
    })
       }

 //This function load the news basis of the the stock which was selected in dropdown 
 
}