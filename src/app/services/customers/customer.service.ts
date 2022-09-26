import { Injectable } from '@angular/core';
import { data } from 'jquery';
import { map, pipe } from 'rxjs';
import { ConfigService } from 'src/app/config/config.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private configService : ConfigService,
  ) { }

  get(id:string){
    return this.configService.getCustomerDetails(id).pipe(
      map(response=>response)
    );
  }

  getOrders(customerID:string){
    return this.configService.getAllCustomerOrders(customerID).pipe(
      map(response=>{
       // console.log(response);
        
       return  response;
      })
    );
  }


  getOrderDetails(orderId:string){
    return this.configService.getOrderDetails(orderId);
  }

  getProductDetails(productId:string){
    return this.configService.getProductDetails(productId);
  }
  

  tes(id:string){
    this.configService.getAllCustomerOrders(id).subscribe(
      data=>{
        console.log(data);
        
      }
    )
  }
}
