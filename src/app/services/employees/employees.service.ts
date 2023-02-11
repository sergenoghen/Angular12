import { Injectable } from '@angular/core';
import { SharedClasses } from 'src/app/abstract-classes/shared-classes';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { SharedService } from 'src/app/shared/shared.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService extends SharedClasses {

  constructor(
    private http :HttpClient,
    private sharedService : SharedService
  ) {
    super('employees', http);
  }

}
