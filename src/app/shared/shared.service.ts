import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(
    private httpClient : HttpClient
  ) { }

  async getClassData(table:string, id:any) {
      return this.httpClient.get<any>(
        environment.apiUrl+"customer/"+table+"/"+id  
      )
  }
}
