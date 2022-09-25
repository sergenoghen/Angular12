import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { isEmpty, map, Observable, of, Subject } from 'rxjs';
import { ConfigService } from 'src/app/config/config.service';
import { Customer } from 'src/app/models/customer';
import * as $ from "jquery";

@Component({
  selector: 'app-customer-card',
  templateUrl: './customer-card.component.html',
  styleUrls: ['./customer-card.component.scss']
})
export class CustomerCardComponent implements OnInit {

  @Input() customer!:Customer;
  constructor(
    private router : Router, 
  ) { }

  ngOnInit(): void {
  }

  


  get data():Customer{
    return this.customer;
  }

  close(id:any){
    $("#"+id).hide();
    console.log($("#"+id));
  }

  details(id:any){
    return this.router.navigateByUrl('customer/details/'+id);
  }

  customerNotExist(data:Customer){
    //isEmpty this.customer 
    
    const customerSource = new Subject<Customer>();
    customerSource.next(data);
    var result = customerSource.pipe(isEmpty());
    // customerSource.complete();
    var f ;
    // console.log(result);
      return result.pipe(
        map(a=>{
          console.log(a);
          return a;
        })
      );
  }

  dataNotFound(){
    return !(this.dataFound);
  }

  get dataFound():Boolean{
    //console.log(this.customer?.CustomerID > 0);
    return this.customer?.CustomerID > 0; 
  }
}
