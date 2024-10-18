import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserdetailsService {
  _url = "http://localhost:3000/api/v1";
  constructor(private _http:HttpClient) { }
  insertUserDetails(userData:any){
    return this._http.post<any>(`${this._url}/login`,userData)
  }
}
