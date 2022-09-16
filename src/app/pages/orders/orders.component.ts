import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { ConfigService } from 'src/app/config/config.service';
import { Order } from 'src/app/models/order';
import { CustomerService } from 'src/app/services/customers/customer.service';
import { OrderActions } from 'src/app/store';
import { selectCustomerOrders } from 'src/app/store/selectors/order.selectors';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  
  orders!:Order[];
  orders$: Observable<Order[]> = new Observable();
  constructor( 
    private customerService : CustomerService,
    private router : Router, 
    private route : ActivatedRoute, 
    private configService:ConfigService,
    private store: Store,
  ) { 

    
    this.orders$ = this.store.select(selectCustomerOrders);
    const id: string = this.route.snapshot.paramMap.get('id')!;
    console.log(id);
    
    this.store.dispatch(OrderActions.getCustomerOrders({ id }));
    
  }

  ngOnInit(): void { 
    /*this.orders$.subscribe(data=>{
      this.orders = data;
    })*/
    const id: string = this.route.snapshot.paramMap.get('id')!;

    this.customerService.getOrders(id).pipe(
      map(orders=>this.orders = orders)
    );

    console.log(this.orders);
  }


  get customerID(){
   this.orders$.subscribe(data=>{
      console.log(data);
      
    })
    
    return 1;
  }

  get orderss$():Observable<any>{
    const id: string = this.route.snapshot.paramMap.get('id')!;
    return this.customerService.getOrders(id).pipe(
      map(orders=>this.orders = orders)
    )
  }  
}
