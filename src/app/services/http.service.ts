import { throwError as observableThrowError, Observable } from 'rxjs';

import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpResponse } from '@angular/common/http';

import {CookieService} from 'ngx-cookie-service';

import { environment } from '../../environments/environment';

@Injectable()
export class HttpService {
  protected headers: HttpHeaders;

  constructor(
      protected http: HttpClient,
      protected cookieService: CookieService,
  ) {
    const headerJson = {
      Authorization: 'Bearer ' + this.cookieService.get('token'),
      'X-Frame-Options': 'deny',
      'Access-Control-Max-Age': (60 * 60 * 24).toString(),
      'Content-Type': 'application/json',
    };
    this.headers = new HttpHeaders(headerJson);
  }

  get(url: string, getHeader?: boolean, getTemplate?: boolean, options?: any): any {
    !!options ? options.headers = this.headers : options = {headers: this.headers};
    if (getHeader) {
      options.observe = 'response';
    }
    // TODO: check if any call has other options than auth headers
    return this.http.get(environment.api_url.concat(url), options).pipe(
        map((res: any) => {
          return getHeader ? {header: res.headers, body: res.body} : getTemplate ? res.body : res;
        }),
        catchError((error: any) => {
          return observableThrowError(error);
        }));
  }

  post(url: string, data?: any, getHeader?: boolean, download?: boolean, args?: any): Observable<any> {
    args = (args == null) ? {} : args;
    if (getHeader) {
      args.observe = 'response';
    }
    args.headers = (args.headers === undefined) ? this.headers : args.headers;

    if (download) {
      args.responseType = 'blob';
    }

    return this.http.post(environment.api_url.concat(url), JSON.stringify(data), args).pipe(
        map((res: any) => {
          return getHeader ? {header: res.headers, body: res.body} : res;
        }),
        catchError((error: any) => {
          return observableThrowError(error);
        }));
  }

  put(url: string, data?: any, args?: any): Observable<any> {
    args = (args == null) ? {} : args;
    args.headers = (args.headers === undefined) ? this.headers : args.headers;
    return this.http.put(environment.api_url.concat(url), JSON.stringify(data), args).pipe(
        map((res: any) => res),
        catchError((error: any) => {
          return observableThrowError(error);
        }));
  }

  remove(url: string, data?: any, args?: any): Observable<any> {
    args = (args == null) ? {} : args;
    args.headers = (args.headers === undefined) ? this.headers : args.headers;
    args.body = JSON.stringify(data);
    return this.http.request('delete', environment.api_url.concat(url), args).pipe(
        map((res: any) => res),
        catchError((error: any) => {
          return observableThrowError(error);
        }));
  }

}
