import { Component, Inject, Input, LOCALE_ID, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {

  customerData!: any;
  data!:Customer;
  customer$: Observable<Customer> = new Observable();

  // matDialog: MatDialog = new MatDialog();
  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private router : Router, 
    private route : ActivatedRoute, 
    private configService:ConfigService,
    public dialog: MatDialog,
    private store: Store,
  ) { 
    
    this.customer$ = this.store.select(selectCustomerDetails);
    const id: string = this.route.snapshot.paramMap.get('id')!;
    this.store.dispatch(CustomerActions.getCustomer({ id }));
  }

  ngOnInit(): void {
    // console.log(this.route.snapshot.paramMap);
    // const id: string = this.route.snapshot.paramMap.get('id')!;
    //   this.configService.getCustomerDetails(id).subscribe((data:Customer)=>{
    //     this.customerData = data;
    //   });
  }

  // get data$():Observable<Customer>{
  //   return of(this.customerData);
  // }

  close(id:any){
    $("#"+id).hide();
  }

  details(id:any){
    return this.router.navigateByUrl('customers/details/'+id);
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
}
