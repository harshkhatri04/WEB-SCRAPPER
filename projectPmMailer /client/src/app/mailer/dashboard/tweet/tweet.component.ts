import { Component, OnInit } from '@angular/core';
import {TweetService} from './tweet.service';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent implements OnInit {
   investmentProductuser: string;

  constructor(private tweetService: TweetService) { }

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
  nasdaq(){
  	let user='nasdaq';
  	this.preference.tweetSearch(user).subscribe((res)=>{
					this.investmentProductuser=res;
					console.log(investmentProductuser);
				})
  }

}
