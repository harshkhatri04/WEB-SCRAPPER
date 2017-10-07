import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class SignUpService {

  constructor(private http: Http) {}

  
  //method to hit server 
  addUser(user) {
    const url = 'http://localhost:3000/signup/users'; // sign up url
    return this.http
      .post(url, user)
      .map(res => res.json(),error => error);
  }
}
