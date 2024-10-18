import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  _url = "http://localhost:3000/api/v1";
  constructor(private _http:HttpClient) { }
  getAllProducts(){
    return this._http.get<any>(`${this._url}/products`);
  }
  getProductsById(id:number){
    return this._http.get<any>(`${this._url}/products/${id}`);
  }
  
  addAllProducts(productsData:any){
    return this._http.post<any>(`${this._url}/products`,productsData);
  }

  getAllSalesOrders(){
    return this._http.get<any>(`${this._url}/sales_order`);
  }

  removeProduct(id:number){
    return this._http.delete<any>(`${this._url}/products/${id}`)
  }
}
