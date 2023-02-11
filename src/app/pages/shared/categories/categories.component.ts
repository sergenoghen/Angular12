import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, of } from 'rxjs';
import { Category } from 'src/app/models/category';
import { CustomerService } from 'src/app/services/customers/customer.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  pcategory!:Category;
  @Input() categoryId!:any;
  constructor(
    private customerService : CustomerService,
    private route : ActivatedRoute,
  ) { 
    const categoryID: any = this.route.snapshot.paramMap.get('categoryId')!;
    this.categoryId =  this.categoryId | categoryID;
  }

  ngOnInit(): void {
    
    this.categoryObj().then(pDetails=>{
      pDetails.subscribe(obser=>{
        this.pcategory = obser;
        //console.log(obser);
      })
    });

  }

   
  async categoryObj(){
    //console.log(this.categoryId);
    let self = this;
    return this.customerService.getCategory(this.categoryId).pipe(
      map(data=> data)
    )
  }

  get category(){    
    return of(this.pcategory);
  }

}
