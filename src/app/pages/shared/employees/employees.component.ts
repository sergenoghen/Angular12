import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Employee } from 'src/app/models/employee';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  @Input() data! :Employee|null ;
  constructor(
    private sharedService : SharedService
  ) { }

  ngOnInit(): void {
  }

  get getData(){    
    return of(this.data);
  }

  toggle(){
    $('.toggle').toggle(300);
  }

}
