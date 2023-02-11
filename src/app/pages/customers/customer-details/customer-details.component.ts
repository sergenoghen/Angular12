import { Component, EventEmitter, Inject, Input, LOCALE_ID, OnInit, Output } from '@angular/core';
import { Observable, ObservableInput, of } from 'rxjs';
import { Customer } from 'src/app/models/customer';
import * as $ from "jquery";
import { Router, ActivatedRoute } from '@angular/router';
import { ConfigService } from 'src/app/config/config.service';
import { MatDialog } from '@angular/material/dialog';
import { CustomerActions } from 'src/app/store';
import { CustomerDialogComponent } from '../customer-dialog/customer-dialog.component';
import { Store } from '@ngrx/store';
import { selectCustomerDetails } from 'src/app/store/selectors/customer.selectors';
import { AnimationsService, ShrinkOutAnimation } from 'src/app/services/animations.service';
//import * as LocalData from 'src/app/local-data/';
import  {   HEROES  } from 'src/app/local-data/heroes';
import { Hero } from 'src/app/models/hero';
import { EmployeesService } from 'src/app/services/employees/employees.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss'],
  animations : [ShrinkOutAnimation],
})
export class CustomerDetailsComponent implements OnInit {

  customerData!: any;
  data!:Customer;
  customer$: Observable<Customer> = new Observable();
  title : Title = new Title(document);
  id='';
 
  // matDialog: MatDialog = new MatDialog();
  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private router : Router, 
    private route : ActivatedRoute, 
    private configService:ConfigService,
    public dialog: MatDialog,
    private store: Store,
    private animationsService : AnimationsService,
    private employeesService : EmployeesService
  ) { 
    
    this.customer$ = this.store.select(selectCustomerDetails);
    const id: string = this.route.snapshot.paramMap.get('id')!;
    this.store.dispatch(CustomerActions.getCustomer({ id }));
    this.id = id;
  }

  ngOnInit(): void {
    // console.log(this.route.snapshot.paramMap);
    // const id: string = this.route.snapshot.paramMap.get('id')!;
    //   this.configService.getCustomerDetails(id).subscribe((data:Customer)=>{
    //     this.customerData = data;
    //   });
    console.log(this.animationsService.shrinkOutAnimation);
    this.title.setTitle(this.id+" | Customer details");
    
  }

  // get data$():Observable<Customer>{
  //   return of(this.customerData);
  // }
 

  close(id:any){
    $("#"+id).hide();
  }

  details(id:any){
    return this.router.navigateByUrl('customer/details/'+id);
  }

  
  setCustomer(newData:Customer){
    if(newData){
      return this.customerData = newData;
    }
    // this.matDialog.open(`<div>Empty data </div>`)
    //console.error('Empty data!');
    return ;
  }


  openDialog() {
    const dialogRef = this.dialog.open(CustomerDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ////////


  // heroes = LocalData.HEROES.slice();
  heroes = HEROES.slice();
  
  onRemove(id: number) {
    this.heroes = this.heroes.filter((hero:Hero) => hero.id !== id);
    return id;
  }

}
