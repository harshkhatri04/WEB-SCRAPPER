import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { config } from '../../../config/config'

@Injectable()
export class UpdatepasswordService {


  constructor(private http:Http) {
   }
  

  updateUserPwd(userPwdInfo,email){
  	console.log(userPwdInfo,email,"hii")
    const url =config.urlToServer+'/update/updatePassword/'+email;
    return this.http.post(url,userPwdInfo)
                     .map(res=>res.json(),error=>error.json())
  }

}
