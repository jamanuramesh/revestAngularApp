import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { SalesorderService } from 'src/app/services/salesorder.service';
export interface Product {
  pid: number;
  name: string;
  description:string;
  price: number;
  quantity: number;
  selectedQuantity?: number;  // Quantity the user selects for the order
}
export interface Order {
  id: number;
  products: Product[];
  total: number;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products:any = [];
  salesorders:any = [];
  showLoader:boolean=false;
  searchQuery: string = '';
  filteredOrders: any[] = []; 
  constructor(private salesorderService: SalesorderService) { }
  ngOnInit(): void {
    this.getAllSalesOrdersData();
  }

  getAllSalesOrdersData(){
    this.showLoader = true;
    this.salesorderService.getAllSalesOrders().subscribe((res:any)=>{
      const status = res.status || false;
      if(status){
        this.salesorders = res.data;
        this.filteredOrders = this.salesorders;
        this.showLoader = false
      }
    },(error:any)=>{
      console.log('Error : ',error);
      this.showLoader = false
    })
  }


  // Search functionality
  onSearch() {
    this.filterSalesOrders();
  }

  // Function to filter sales orders based on search and filter criteria
  filterSalesOrders() {
    this.filteredOrders = this.salesorders.filter((order:any) => {
      const matchesSearch = !this.searchQuery || 
                            order.name.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
                            order.email.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                            order.mobile_no.toString().includes(this.searchQuery) ||
                            order.order_date.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchesSearch;
    });
  }
}