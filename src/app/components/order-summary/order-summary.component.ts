import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';
import { SalesorderService } from 'src/app/services/salesorder.service';


@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {
  orderData!: Order;
  constructor(private orderService: OrderService,private salesorderService: SalesorderService) { }

  ngOnInit(): void {
    this.orderData = this.orderService.getOrder();
  }

  removeProduct(productId: number): void {
    this.orderService.removeProduct(productId);
  }

  placeOrder(): void {
    //this.orderService.placeOrder();
    console.log(this.orderData);
    this.salesorderService.submitOrder(this.orderData).subscribe(
        (res:any) => {
            const status = res.status || false;
            if(status){
              alert(res.data);
            }else{
              alert(res.data);
            }
            // console.log('Sales Order Placed successfully', response);
        },
        (error:Error) => {
            console.error('Error submitting order', error);
        }
    );
  }
}