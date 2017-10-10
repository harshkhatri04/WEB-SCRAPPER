import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class SettingsService {


  constructor(private http:Http) {
   }
  updateUser(userInfo,email){
  	console.log(userInfo,email)
    const url ='http://localhost:3000/update/updateUser/'+email;
    return this.http.put(url,userInfo)
                     .map(res=>res.json(),error=>error.json())
  }

  getDataFromDB(email){
    const url ='http://localhost:3000/find/findUser/'+email;
     return this.http.get(url)
                     .map(res=>res.json(),error=>error.json())

  }
}
