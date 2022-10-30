import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Logger } from '@ngrx/data';
import { map, Observable, of } from 'rxjs';
import { Product } from 'src/app/models/product';
import { CustomerService } from 'src/app/services/customers/customer.service';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.scss']
})
export class ProductsDetailsComponent implements OnInit {

  @Input() data! :Product|null ;
  
  @Input() productId!:any;
  constructor(
    private customerService : CustomerService,
    private route : ActivatedRoute, 
  ) {
    const productID: any = this.route.snapshot.paramMap.get('productId')!;
    console.log(isNaN(productID));

    this.productId =  this.productId | productID;
   }

  ngOnInit(): void {
    
  }
  
  get goBack(){
    this.route.url.subscribe(ob=>{
      var last = ob[ob.length-1];
      //console.log(last);
    })
    return this.route;
  }
  
}
