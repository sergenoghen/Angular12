import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ofEntityOp } from '@ngrx/data';
import { map, Observable, of } from 'rxjs';
import { Product } from 'src/app/models/product';
import { CustomerService } from 'src/app/services/customers/customer.service';
import { EmployeesService } from 'src/app/services/employees/employees.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  pDetails!:Product[];
  @Input() productId!:any;
  constructor(
    
    private route : ActivatedRoute, 
    private customerService : CustomerService,
    private employeesService : EmployeesService
  ) {
    const productID: any = this.route.snapshot.paramMap.get('productId')!;
    console.log(isNaN(productID));
    this.productId =  this.productId | productID;
   }

  ngOnInit(): void {
    
    this.productDetails().then(pDetails=>{
      pDetails.subscribe(obser=>{
        this.pDetails = obser;
        console.log(obser);
      })
    })
  }
  
  async productDetails(){
    let self = this;
    return this.customerService.getProductDetails(this.productId).pipe(
      map(data=> data)
    )
  }

  get details(){    
    return of(this.pDetails);
  }


}
