import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/product';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {


  protected  options?: {
      headers?: {[header: string]: []},
      observe?: 'response',
      params?: {[param: string]: ReadonlyArray<true>},
      reportProgress?: boolean,
      responseType?: 'json',
      withCredentials?: boolean,
  }

  protected configUrl = 'assets/config.json';

  constructor(
    private http: HttpClient,
    private router : Router,
    private route : ActivatedRoute,
  ) { }
       
  getCustomersPerPage(page:any=1) {
    return this.http.get<any>(environment.apiUrl+"customer?page="+page)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  getCustomers() {
    return this.http.get<any>(environment.apiUrl+"customer?page=1")
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  getCustomerDetails(id:any=1) {
    
    return this.http.get<any>(environment.apiUrl+"customer/details/"+id)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }
  
  getAllCustomerOrders(id:any) {
    
    return this.http.get<any>(environment.apiUrl+"customer/"+id+"/orders")
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  async getOrderDetails(orderId:any) {
    return this.http.get<any>(
      environment.apiUrl+"customer/orders/"+orderId   
      );
  }

  getProductDetails(productId:string) {
    return this.http.get<Product[]>(
      environment.apiUrl+"customer/products/"+productId  
      ).pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  getCategory(categoryId:string) {
    return this.http.get<Category>(
      environment.apiUrl+"customer/orders/product/category/"+categoryId
      ).pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }


  async createCategory(category:Category){
    return this.http.post<PostResult>(environment.apiUrl+'customer/category/create?', category).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
    
  }


  getConfigResponse(): Observable<HttpResponse<PostResult>> {
    return this.http.get<PostResult>(
      this.configUrl, { observe: 'response' });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}

export interface Config {
  message: string;
  error: string;
  date: any;
  Category: Category;
}


export interface PostResult {
  message: string;
  error: string;
  date: any;
  Category: Category;
}