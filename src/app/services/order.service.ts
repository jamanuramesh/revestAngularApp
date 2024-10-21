import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import {Order} from '../models/order.model';
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orderData : Order = { id: 1, products: [], total: 0 };
  constructor() { }

  getOrder(): Order {
    return this.orderData;
  }

  addProduct(product: Product): void {
    const existingProduct = this.orderData.products.find((p:any) => p.pid === product.pid);
    if (existingProduct) {
      existingProduct.selectedQuantity! += product.selectedQuantity || 1;
    } else {
      this.orderData.products.push({ ...product, selectedQuantity: 1 });
    }
    this.updateTotal();
  }

  removeProduct(productId: number): void {
    this.orderData.products = this.orderData.products.filter(p => p.pid !== productId);
    this.updateTotal();
  }

  private updateTotal(): void {
    this.orderData.total = this.orderData.products.reduce(
      (sum, product) => sum + product.price * (product.selectedQuantity || 1),
      0
    );
  }

  placeOrder(): void {
    // Add your backend API call to submit the order
    console.log('Order placed', this.orderData);
  }
}