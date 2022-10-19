import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersComponent } from 'src/app/pages/customers/customer/customers.component';
import { CustomerDetailsComponent } from 'src/app/pages/customers/customer-details/customer-details.component';
import { CustomerRoutingModule } from './customer-routing/customer-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomerCardComponent } from 'src/app/pages/customers/customer-card/customer-card.component';
import { OrdersComponent } from 'src/app/pages/orders/orders.component';
import { CustomerDialogComponent } from '../../pages/customers/customer-dialog/customer-dialog.component';
import { HeroListAutoComponent } from '../../hero-list-auto/hero-list-auto.component';
import { ProductsDetailsComponent } from '../../pages/products/products-details/products-details.component';
import { EmployeesComponent } from '../../pages/shared/employees/employees.component';
import { CategoriesComponent } from '../../pages/shared/categories/categories.component';
import { ShippersComponent } from '../../pages/shared/shippers/shippers.component';
import { SuppliersComponent } from '../../pages/shared/suppliers/suppliers.component';
import { OrdersDetailsComponent } from 'src/app/pages/orders/orders-details/orders-details.component';
import { ProductsComponent } from 'src/app/pages/products/products.component';
// import { YouTubePlayerModule } from '@angular/youtube-player';
// import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    CustomersComponent,
    CustomerDetailsComponent,
    CustomerDialogComponent,
    CustomerCardComponent,
    HeroListAutoComponent,
    OrdersComponent,
    OrdersDetailsComponent,
    ProductsComponent,
    ProductsDetailsComponent,
    EmployeesComponent,
    CategoriesComponent,
    ShippersComponent,
    SuppliersComponent,
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule
  ],
})
export class CustomerModule { }
