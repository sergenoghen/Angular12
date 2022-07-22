//https://v10.ngrx.io/guide/effects
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ConfigService, Config } from 'src/app/config/config.service';
import { Customer } from 'src/app/models/customer';


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
  posts!:any;

  constructor(
    private configService:ConfigService,
    private http :HttpClient,
    ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.configService.getCustomers().subscribe((data:Customer)=>{
        this.posts = data;
      })
    }, 500);
  }

  get posts$():Observable<any>{
    return of(this.posts);
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
   
}
