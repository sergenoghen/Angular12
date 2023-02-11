//https://v10.ngrx.io/guide/effects
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ConfigService, PostResult, Config } from 'src/app/config/config.service';
import { Customer } from 'src/app/models/customer';
import * as $ from "jquery";
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';



@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  providers: [ ConfigService ],
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  config!:Config;
  error!: any;
  headers!: string[];
  customers!:Customer[];
  customersCurrentPage:number=1;
  firstPage:number=1;
  lastPage:number=this.firstPage;
  title : Title = new Title(document);

  constructor(
    private configService:ConfigService,
    private http :HttpClient,
    private router : Router, 
    ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.configService.getCustomers().subscribe((result:any)=>{
        this.customers = result.data;
        this.customersCurrentPage = result.current_page;
        this.firstPage = result.from;
        this.lastPage = result.last_page;
      })
    }, 50);

    this.title.setTitle("Customers' list");
    console.log(     this.title.getTitle())
  }

  getCurrentPage(){
    
  }

  get customers$():Observable<Customer[]>{
    return of(this.customers);
  }

  get dataLoaded():Observable<Boolean>{
    return of(this.customers?.length > 0);
  }

  showConfigResponse() {
    this.configService.getConfigResponse()
      // resp is of type `HttpResponse<Config>`
      .subscribe(resp => {
        // display its headers
        const keys = resp.headers.keys();
        this.headers = keys.map(key =>
          `${key}: ${resp.headers.get(key)}`);

        // access the body directly, which is typed as `Config`.
        this.config = { ...resp.body! };
      });
  }

  get nextPage(){
    this.customersCurrentPage++;
    if(this.customersCurrentPage > this.lastPage){
      this.customersCurrentPage = this.lastPage;
      stop() ;//return ;
    }
    this.customersCurrentPage = this.customersCurrentPage > this.lastPage ? this.lastPage : this.customersCurrentPage;
      this.configService.getCustomersPerPage(this.customersCurrentPage).subscribe((result:any)=>{
        //this.customers = [...this.customers, ...result.data]; //for view more
        this.customers = [ ...result.data]; //for next page
        this.lastPage = result.last_page;
      })
    return this.router.navigateByUrl('customer?page='+this.customersCurrentPage);
  }

  
  get previewsPage(){
    this.customersCurrentPage--;
    this.customersCurrentPage = this.customersCurrentPage < this.firstPage ? this.firstPage : this.customersCurrentPage;
    this.configService.getCustomersPerPage(this.customersCurrentPage).subscribe((result:any)=>{
      this.customers = result.data;
    })
    return this.router.navigateByUrl('customer?page='+this.customersCurrentPage);
  }
   
}
