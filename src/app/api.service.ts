import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getUsrsList() {
    let url = environment.url;
    let headers = new HttpHeaders();
    let params = new HttpParams();
    params = params.append('department', 'product');
    params = params.append('department', 'Dept');
   // params['order-by'] = 'firstName,desc';
    headers = headers.set('X-Jwt-Token',environment.token);
    console.log(headers.get('X-Jwt-Token'));
    return this.http.get(url, {
      headers: headers,
      params: params
    });
  }
}
