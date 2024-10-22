import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class SalesorderService {

  private apiUrl = 'https://third-party-api.com/salesOrder';

  constructor(private _http: HttpClient) { }

  getAllSalesOrders():Observable<any>{
    return this._http.get<any>(this.apiUrl);
  }

  submitOrder(orderDetails: any): Observable<any> {
    return this._http.post(this.apiUrl, orderDetails);
  }
}