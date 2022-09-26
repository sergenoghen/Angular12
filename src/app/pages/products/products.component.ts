import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ofEntityOp } from '@ngrx/data';
import { map, Observable, of } from 'rxjs';
import { ProductDetails } from 'src/app/models/productDetails';
import { CustomerService } from 'src/app/services/customers/customer.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  productsDetails!:Observable <ProductDetails[]>;
  productId!:any;
  constructor(
    
    private route : ActivatedRoute, 
    private customerService : CustomerService,
  ) {
    const productID: string = this.route.snapshot.paramMap.get('productId')!;
    this.productId = productID;
    this.productDetails(productID);
   }

  ngOnInit(): void {
    
  }
  
  async productDetails(productID:any){
    let self = this;
    return this.customerService.getProductDetails(productID).then(
       data=> this.productsDetails = data
    )
  }

  strigify(data: any){
    console.log(data);
  }
}
