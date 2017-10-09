import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent implements OnInit {
   investmentProductuser: string;

  constructor() { }

  ngOnInit() {
  }

 /* currency(currencyuser:string){
  	this.investmentProductuser=currencyuser;
   let user='';
  }

  funds(fundsuser: string){
  	this.investmentProductuser=fundsuser;
  	let user='';
  }
*/
 

}
