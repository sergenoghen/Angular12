import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, of } from 'rxjs';
import { ConfigService } from 'src/app/config/config.service';
import { Order } from 'src/app/models/order';
import { OrderDetails } from 'src/app/models/orderDetails';
import { CustomerService } from 'src/app/services/customers/customer.service';
import { OrderActions } from 'src/app/store';
import { selectCustomerOrders } from 'src/app/store/selectors/order.selectors';
import { environment } from 'src/environments/environment';
import * as $ from 'jquery';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders$: Observable<Order[]> = new Observable();
  customerID!:any;
  orderDetails!:Observable<OrderDetails>;
  constructor( 
    private customerService : CustomerService,
    private router : Router, 
    private route : ActivatedRoute, 
    private configService:ConfigService,
    private store: Store,
  ) { 

    
    this.orders$ = this.store.select(selectCustomerOrders);
    const id: string = this.route.snapshot.paramMap.get('id')!;
    this.customerID = id;
    
    this.store.dispatch(OrderActions.getCustomerOrders({ id }));
    
  }

  ngOnInit(): void { 
    
  }

  get ordersArray$():Observable<Order[]>{
    return this.orders$.pipe(
      map(orders=>Object.values(orders))
    )
  }

  //getOrderDetails()


  details(orderID:any){
   
  }
  
  getOrderDetailss(orderID:any){
    let self = this;
    $.ajax({
        url: environment.apiUrl+"/customer/orders/"+orderID,
        cache: false
      })
      .done(function( html ) {
        $( "#results" ).append( html );
        console.log(html);
        
        self.orderDetails = html;
      });
  }


}
