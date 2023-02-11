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
import { EmployeesService } from 'src/app/services/employees/employees.service';
import { SharedService } from 'src/app/shared/shared.service';
import { Employee } from 'src/app/models/employee';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders$: Observable<Order[]> = new Observable();
  customerID!:any;
  orderDetails!:Observable<OrderDetails>;
  employeesData$!:Observable<any>;

  constructor( 
    private customerService : CustomerService,
    private router : Router, 
    private route : ActivatedRoute, 
    private configService:ConfigService,
    private store: Store,
    private employeesService : EmployeesService,
    private httpClient : HttpClient,
    private sharedService : SharedService
  ) { 

    
    this.orders$ = this.store.select(selectCustomerOrders);
    const id: string = this.route.snapshot.paramMap.get('id')!;
    this.customerID = id;
    
    this.store.dispatch(OrderActions.getCustomerOrders({ id }));
    
  }

  ngOnInit(): void { 
    
  }

  get ordersComplete$():Observable<any[]>{
    return this.orders$.pipe(
      map(response=>Object.values(response))
    )
  }

  get ordersObject$():Observable<Order[]>{
    return this.ordersComplete$.pipe(
      map(response=>Object.values(response)[0])
    )
  }

  

  get employeesObject$():Observable<Employee[]>{
    return this.ordersComplete$.pipe(
      map(response=>Object.values(response)[1])
    )
  }

  employee(id:any):Observable<Employee|null>{
   return this.employeesObject$.pipe(
    map(response=>response[id])
    )
  }


  //getOrderDetails()

  
  details(orderID:any){
    
    return this.router.navigateByUrl('customer/orders/details/'+orderID);
  }
  
  /*getOrderDetailss(orderID:any){
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
  }*/

 
  
  getEmployeesData(employeesID:any){
    return this.sharedService.getClassData("employees",employeesID).then(d=>{
      this.employeesData$ = d;
      //console.log(d);
    })
  }

  

}
