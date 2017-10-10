
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class UpdatepasswordService {


  constructor(private http:Http) {
   }
  

  updateUserPwd(userPwdInfo,email){
  	console.log(userPwdInfo,email,"hii")
    const url ='http://localhost:3000/update/updatePassword/'+email;
    return this.http.post(url,userPwdInfo)
                     .map(res=>res.json(),error=>error.json())
  }

}
