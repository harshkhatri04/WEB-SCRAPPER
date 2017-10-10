import { Component, OnInit } from '@angular/core';
import {CurrencyService} from '../service/currency.service';
/**
 * [Component description]
 * @param {['./currency.component.css']}} {  selector [description]
 */
@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})

/**
 *  currency component class
 */
export class CurrencyComponent implements OnInit {

  constructor(private currency:CurrencyService) { }

  ngOnInit() {
  }

}
