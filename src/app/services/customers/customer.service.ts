import { Injectable } from '@angular/core';
import { map, pipe } from 'rxjs';
import { ConfigService } from 'src/app/config/config.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private configService : ConfigService,
  ) { }

  get(id:string){
    return this.configService.getCustomerDetails(id).pipe(
      map(response=>response)
    );
  }

  getOrders(id:string){
    return this.configService.getCustomerOrders(id).pipe(
      map(response=>{
        console.log(response);
        
       return  response;
      })
    );
  }

  tes(id:string){
    this.configService.getCustomerOrders(id).subscribe(
      data=>{
        console.log(data);
        
      }
    )
  }
}
