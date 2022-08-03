import { Component, Input, OnInit } from '@angular/core';
import { Observable, ObservableInput, of } from 'rxjs';
import { Customer } from 'src/app/models/customer';
import * as $ from "jquery";
import { Router, ActivatedRoute } from '@angular/router';
import { ConfigService } from 'src/app/config/config.service';
import { MatDialog } from '@angular/material/dialog';
import { CustomerDialogComponent } from '../customer-dialog/customer-dialog.component';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {

  customerData!: any;
  data!:Customer;
  // matDialog: MatDialog = new MatDialog();
  constructor(
    private router : Router, 
    private route : ActivatedRoute, 
    private configService:ConfigService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.paramMap);
    const id: string = this.route.snapshot.paramMap.get('id')!;
      this.configService.getCustomerDetails(id).subscribe((data:Customer)=>{
        this.customerData = data;
      });
  }

  get data$():Observable<Customer>{
    return of(this.customerData);
  }

  close(id:any){
    $("#"+id).hide();
    console.log($("#"+id));
  }

  details(id:any){
    return this.router.navigateByUrl('customers/details/'+id);
  }

  
  setCustomer(newData:Customer){
    //console.log(newData);
    
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
