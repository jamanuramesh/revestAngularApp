import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
export interface Product {
  id: number;
  name: string;
  description:string;
  price: number;
  image_url:string;
  quantity: number;
}
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private _url = "http://localhost:3000/api/v1";
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

  createProduct(product: Product){
    return this._http.post<any>(`${this._url}/products`,product);
  }

  getAllSalesOrders(){
    return this._http.get<any>(`${this._url}/sales_order`);
  }

  updateProduct(product:any){
    return this._http.put<any>(`${this._url}/products/${product.pid}`,product);
  }

  removeProduct(id:number){
    return this._http.delete<any>(`${this._url}/products/${id}`)
  }
}
