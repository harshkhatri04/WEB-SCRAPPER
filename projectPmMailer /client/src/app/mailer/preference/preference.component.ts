import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService} from "ng2-bootstrap-modal";
import {PreferenceService} from './preference.service';
import {config} from '../../config/config'

export interface ConfirmModel {
	title:string;
	message:string;
}

@Component({
  selector: 'app-preference',
  templateUrl: './preference.component.html',
  styleUrls: ['./preference.component.css']
})
export class PreferenceComponent extends DialogComponent<ConfirmModel,boolean> implements ConfirmModel,OnInit {
	title: string;
	message: string;
 user: any={};
 radioBut: any=[];
	pref: any=[];
	items:string[];
	config=config;
//preferences items
	basicExampleSelectedItems = [];
	placeholderExampleList = [];
	placeholderExampleSelectedItems = [];
	placeholderExampleSettings = {};

	

	constructor(private preference: PreferenceService,dialogService: DialogService){
		 super(dialogService);
	}
	ngOnInit(){
		this.user = {
				freqency: this.frequency[0].value,
				role: null
		}
		
		this.basicExampleSelectedItems = [
													{"id":1,"itemName":"Funds"},
													{"id":2,"itemName":"Nasdaq Stocks"},
													{"id":3,"itemName":"Currency"}
													
												             ];
	 
		this.placeholderExampleList = [
													{"id":1,"itemName":"Funds"},
													{"id":2,"itemName":"Nasdaq Stocks"},
													{"id":3,"itemName":"Currency"}
												];
		
		this.placeholderExampleSelectedItems = [
													{"id":1,"itemName":"Funds"}];

		this.placeholderExampleSettings = { 
															text:"Select preferences",
															selectAllText:'Select All',
															unSelectAllText:'UnSelect All',
															enableSearchFilter: true,
															classes:"myclass custom-class",
															searchPlaceholderText: "Custom Placeholder text"
														};

 
	}
	public frequency = [
		{ value: 'D', display: 'Daily' },
		{ value: 'W', display: 'Weekly' },
		{value: 'M', display: 'Monthly'}
];
	onItemSelect(item:string[]){
		this.items=item;
	}
	OnItemDeSelect(item:string[]){
		this.items=item;
	}
	onSelectAll(items: string[]){
    this.items=items;
	}
	 onDeSelectAll(items: string[]){
	 	this.items=items;
	}
confirm() {
		this.result = true;
		this.close();
	}
	public save(preferenceSetting: string, isValid:any) {
      let preferences={
			items:this.items,
			frequency: preferenceSetting
      }
      let email="admin@123";//localStorage.getItem('email');

				this.preference.insert(preferences,email).subscribe((res)=>{
					
				})
		}
}
