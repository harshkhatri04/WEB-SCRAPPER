import { Component, OnInit } from '@angular/core';
import {NasdaqService} from './service/nasdaq.service';
import { config } from '../../config/config';

@Component({
 selector: 'app-dashboard',
 templateUrl: './dashboard.component.html',
 styleUrls: ['./dashboard.component.css','./animate.min.css','./light-bootstrap-dashboard.css','./demo.css','./pe-icon-7-stroke.css']
})
export class DashboardComponent implements OnInit { 
 constructor(private nas:NasdaqService) { }
 list:any=[]
data:any
dat:any=[];
val:any=['ETF','Bonds','Stocks','NASDAQ']
    
    a:any; 
    config:any;   

    ngOnInit() {      
        this.nas.getnas().subscribe((data)=>{              
        	this.list=data;console.log(this.list)    })

        this.getConfig()
}
  search(name){
this.a={
    term: name
}    
   this.nas.getresult(this.a).subscribe(res=>{
           console.log(res)
           this.dat=res.data;
            })
       }

       getConfig():any {
    return Promise.resolve(config)
    .then(data => {
      this.config = data;
      console.log(data)
    })
  }
 
}