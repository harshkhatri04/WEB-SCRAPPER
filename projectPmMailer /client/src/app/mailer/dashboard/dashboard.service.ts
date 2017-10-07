import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { config } from '../../config/config'

@Injectable()
export class DashboardService {

  constructor(private http: Http) {}
  //method for logout
  signout() {
    const url = config.urlToServer.DASHBOARD_SERVICE_GET
    return this.http
      .get(url)
      .map(res => res, error => error)
  }

}
