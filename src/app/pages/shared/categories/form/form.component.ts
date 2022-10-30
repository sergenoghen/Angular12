import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Config, PostResult } from 'src/app/config/config.service';
import { Category, CategoryModel } from 'src/app/models/category';
import { CustomerService } from 'src/app/services/customers/customer.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

    newCategory = new CategoryModel();
    postResult! : Observable<Config>;
  constructor(
    private customerService : CustomerService,
    ) { }

  ngOnInit(): void {
  }

  profileForm = new FormGroup({
    CategoryName: new FormControl('', Validators.required),
    Description: new FormControl(''),
  });

  showFormData(){
    console.log(this.profileForm.value);
    this.newCategory.CategoryName = this.profileForm.value.CategoryName+'';
    this.newCategory.Description = this.profileForm.value.Description+'';

    console.log(this.newCategory);
    this.customerService.createCategory(this.newCategory).then(result=>{
      this.postResult = result;
      this.test();
    });
  }

  get postReturn(){
    return this.postResult;
  }

  showMessage(msg:any){
    alert("Category created");
  }

 test() {
    this.postReturn?.subscribe(obser=>{
      let key = Object.keys(obser);
      console.log(obser);
      
    })
  }

  
//  get error() {
//   return this.postReturn?.pipe(
//     map((obser)=>obser?.error)
    
//   )
// }

}
