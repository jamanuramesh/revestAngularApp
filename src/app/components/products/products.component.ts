import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
interface product{
  id:number;
  name:string;
  description:string;
  image:string;
  price:number;
  quantity:number;
}
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products:any[]=[];
  showLoader:boolean=false;
  constructor(private productsService:ProductsService) { }

  ngOnInit(): void {
    this.getAllProductsData();
  }

  getAllProductsData(){
    this.showLoader=true;
    this.productsService.getAllProducts().subscribe((res:any)=>{
      const status = res.status || false;
      if(status){
        this.products = res.data;
        this.showLoader=false;
      }
    },(error:any)=>{
      console.log('Error : ',error);
      this.showLoader=false;
    })
  }

  inc(item:any){
    this.products = this.products.map((product)=>{  
      if(item.pid == product.pid){
        return {
          ...product,
          quantity:product.quantity+1 
        }
      }
      return product;
    });
  }
  
  dec(item:any){
    this.products = this.products.map((product)=>{
      if(item.pid === product.pid){
        return {
          ...product,
          quantity:product.quantity-1 > 0 ? product.quantity-1 : 1
        }
      }
      return product;
    })
  }

  grandTotal(){
    let total:number=0;
    for(let item of this.products){
       total+= item.quantity * item.price;
    }
    return total;
  }

  removeItem(item:any){
   if(confirm("Are you sure to remove the Item?")){
    this.productsService.removeProduct(item.pid).subscribe((res:any)=>{
      const status = res.status || false;
        if(status){
          this.getAllProductsData();
        }
    },(error:any)=>{
        console.log('Error : ',error);
        this.showLoader=true;
    })
   }
  }
  
  placeOrder(){
    if(confirm("Are you sure ? you want to place the Order?")){
      this.productsService.addAllProducts(this.products).subscribe((res:any)=>{
        const status = res.status || false;
          if(status){
            alert(res.data);
            this.getAllProductsData();
          }
      },(error:any)=>{
          console.log('Error : ',error);
          this.showLoader=true;
      })
     }
  }
}