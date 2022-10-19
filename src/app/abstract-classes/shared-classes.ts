import { environment } from "src/environments/environment";
import { HttpClient, HttpErrorResponse, HttpResponse, HttpHandler } from '@angular/common/http';
import { ConfigService } from "../config/config.service";

export abstract class SharedClasses {
    constructor(
        private table:string, 
        private httpClient : HttpClient,
    ){

    }

    /*async getClassData( id:any) {
        return this.httpClient.get<any>(
          environment.apiUrl+"customer/"+this.table+"/"+id  
        )
    }*/

}