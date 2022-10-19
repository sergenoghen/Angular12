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
  
  pDetails!:Product[];
  @Input() productId!:any;
  constructor(
    private customerService : CustomerService,
    private route : ActivatedRoute, 
  ) {
    
    const productID: any = this.route.snapshot.paramMap.get('productId')!;
    this.productId =  this.productId | productID;
   }

  ngOnInit(): void {
    
    this.productDetails().then(pDetails=>{
      pDetails.subscribe(obser=>{
        this.pDetails = obser;
      })
    })
  }
  
  async productDetails(){
    return this.customerService.getProductDetails(this.productId).pipe(
      map(data=> data)
    )
  }

  get details(){    
    return of(this.pDetails);
  }
  
}
