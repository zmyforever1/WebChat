import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { API_LOGIN } from './api';
import { API_REGISTER } from './api';

interface User {
  email: string;
  password: string;
  repass?: string;
}

interface UserInfo {
  id: string;
  email: string;
}

@Injectable()
export class AuthService {
  public isLogin = false;
  public userInfo: UserInfo;

  constructor(
    public http: Http,
  ) {
  }

  public getUser() {
    const isLog = this.http.get(API_LOGIN)
      .map(this.extractData)
      .catch(this.handleError);

    isLog.subscribe(
      succ => {
        this.isLogin = true;
        this.userInfo = succ.userInfo;
      },
      err => this.isLogin = false,
    );

    return isLog;
  }

  public login(userInfo) {
    if (userInfo.email === null || userInfo.password === null) {
      return Observable.throw('请输入邮箱和密码！');
    } else {
      return this.http
        .post(API_LOGIN, userInfo)
        .map(this.extractData)
        .catch(this.handleError);
    }
  }

  public regist(userInfo) {
    if (userInfo.email === null || userInfo.password === null) {
      return Observable.throw('请输入邮箱和密码！');
    } else {
      return this.http
        .post(API_REGISTER, userInfo)
        .map(this.extractData)
        .catch(this.handleError);
    }

  }

  public extractData(res: Response) {
    const body = res.json();
    return body || {};
  }

  public handleError(error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
