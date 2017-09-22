import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class SignUpService {

  constructor(private http: Http) {}
  //method to hit server 
  addUser(user) {
    console.log(user)
    const url = 'http://192.168.252.47:3000/api/users'; // sign up url
    return this.http
      .post(url, user)
      .map(res => res.json());
  }
}
