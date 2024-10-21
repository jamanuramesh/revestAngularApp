import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products:any[]=[];
  productsForm!:FormGroup;
  showLoader:boolean=false;

  constructor(private fb:FormBuilder,private productsService:ProductsService) { }

  ngOnInit(): void {
    this.productsForm = this.fb.group({
      pid:[''],
      name: ['',[Validators.required,Validators.minLength(3)]],
      description:['',[Validators.required]],
      price:['',[Validators.required]],
      image_url:['../assets/images/products/dell/dell1.jpeg',[Validators.required]],
      quantity:['',[Validators.required]]
    });
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

  // inc(item:any){
  //   this.products = this.products.map((product)=>{  
  //     if(item.pid == product.pid){
  //       return {
  //         ...product,
  //         quantity:product.quantity+1 
  //       }
  //     }
  //     return product;
  //   });
  // }
  
  // dec(item:any){
  //   this.products = this.products.map((product)=>{
  //     if(item.pid === product.pid){
  //       return {
  //         ...product,
  //         quantity:product.quantity-1 > 0 ? product.quantity-1 : 1
  //       }
  //     }
  //     return product;
  //   })
  // }

  // grandTotal(){
  //   let total:number=0;
  //   for(let item of this.products){
  //      total+= item.quantity * item.price;
  //   }
  //   return total;
  // }

  editItem(item:any){
    if(confirm("Are you sure you want to update the Product?")){
      let editObject = this.products.filter((product)=>  (item.pid == product.pid))[0];
      if (editObject) {
        this.productsForm.patchValue(editObject);
      }
     }
  }

  removeItem(item:any){
   if(confirm("Are you sure to remove the Product?")){
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
  
   onSubmit(){
    let postProductData:any = [this.productsForm.value];
    if(this.productsForm.value.pid && this.productsForm.value.pid!=''){
      this.productsService.updateProduct(this.productsForm.value)
      .subscribe((res:any)=>{
         const status  = res.status || false;
         if(status){
          alert(res.data)
          this.resetForm();
          this.getAllProductsData();
         }else{
          alert(res.data)
         }
      },(error:Error)=>{
        console.log('Error : ',error.message)
      });
    }else{
      this.productsService.createProduct(postProductData)
      .subscribe((res:any)=>{
         const status  = res.status || false;
         if(status){
          alert(res.data)
          this.resetForm();
          this.getAllProductsData();
         }else{
          alert(res.data)
         }
      },(error:Error)=>{
        console.log('Error : ',error.message)
      });
    }
  }

  resetForm() {
    this.productsForm.reset();
  }
}