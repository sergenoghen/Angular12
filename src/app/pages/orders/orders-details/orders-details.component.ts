import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ofEntityOp } from '@ngrx/data';
import { map, Observable, of } from 'rxjs';
import { OrderDetails } from 'src/app/models/orderDetails';
import { Product } from 'src/app/models/product';
import { CustomerService } from 'src/app/services/customers/customer.service';


@Component({
  selector: 'app-orders-details',
  templateUrl: './orders-details.component.html',
  styleUrls: ['./orders-details.component.scss']
})
export class OrdersDetailsComponent implements OnInit {

  orderDetails!:Observable <OrderDetails[]>;
  orderId!:any;
  
  productsDetails!:Observable <Product[]>;

  constructor(
    private route : ActivatedRoute, 
    private router : Router, 
    private customerService : CustomerService
    
  ) {
    const orderID: string = this.route.snapshot.paramMap.get('orderId')!;
    this.orderId = orderID;
    this.details(orderID);
   }

  ngOnInit(): void {
  }

  
  async details(orderID:any){
    let self = this;
    return this.customerService.getOrderDetails(orderID).then(
       data=> this.orderDetails = data
    )
  }

  goToLink(productId:any){
    return this.router.navigateByUrl('customer/orders/products/details/'+productId);
  }

  
  /*productDetails(productID:any):Observable<Product[]>{
    let self = this;
    return this.customerService.getProductDetails(productID).then(data=>{
      this.productsDetails = data;
      return data
    })
  }*/

}
