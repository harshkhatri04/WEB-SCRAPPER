import { Injectable } from '@angular/core';
import {Http , Response} from '@angular/http';

@Injectable()

export class PreferenceService {

constructor(private http: Http) { }
insert(data:any,email:string){
	console.log('wwww'+JSON.stringify(data));
  return this.http.put('http://localhost:3000/investment/investment/'+email,data)
  .map(res=>res.json());
}
}