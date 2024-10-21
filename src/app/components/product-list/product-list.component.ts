import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Product } from '../../models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products:any = [];
  salesorders:any = [];
  showLoader:boolean=false;

  displayedItems: any[] = []; 
  currentIndex: number = 0; 
  itemsPerLoad: number = 4;
  hasMoreItems:boolean = false
  constructor(private productsService:ProductsService,private orderService: OrderService) { }

  ngOnInit(): void {
    this.getAllProductsData();
  }

  getAllProductsData(){
    this.showLoader=true;
    this.productsService.getAllProducts().subscribe((res:any)=>{
      const status = res.status || false;
      if(status){
        this.products = res.data;
        this.loadMore()
        this.showLoader=false;
      }
    },(error:any)=>{
      console.log('Error : ',error);
      this.showLoader=false;
    })
  }

  addToOrder(product: Product): void {
    this.orderService.addProduct(product);
  }

  loadMore() {
    const newItems = this.products.slice(this.currentIndex, this.currentIndex + this.itemsPerLoad);
    this.displayedItems.push(...newItems);
    this.currentIndex += this.itemsPerLoad;
    if (this.currentIndex >= this.products.length) {
      this.hasMoreItems = false;
    } else {
      this.hasMoreItems = true;
    }
    // this.hasMoreItems = true;
  }
  
}