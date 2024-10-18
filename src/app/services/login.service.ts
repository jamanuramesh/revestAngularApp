import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  _url = "http://localhost:3000";
  constructor(private _http:HttpClient) { }
  userLogin(userData:any){
    return this._http.post<any>(`${this._url}/login`,userData);
  }

  isValidUser(userData:any){
    return this._http.post<any>(`${this._url}/login/check`,userData);
  }
}
