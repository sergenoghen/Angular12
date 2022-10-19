import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from 'src/app/pages/page-not-found/page-not-found.component';
import { CustomerDetailsComponent } from 'src/app/pages/customers/customer-details/customer-details.component';
import { CustomersComponent } from 'src/app/pages/customers/customer/customers.component';
import { OrdersDetailsComponent } from 'src/app/pages/orders/orders-details/orders-details.component';
import { ProductsComponent } from 'src/app/pages/products/products.component';
import { ProductsDetailsComponent } from 'src/app/pages/products/products-details/products-details.component';
import { CategoriesComponent } from 'src/app/pages/shared/categories/categories.component';

const routes: Routes = [
  { path: 'details/:id', component: CustomerDetailsComponent },
  { path: 'orders/details/:orderId', component: OrdersDetailsComponent }, 
  { path: 'orders/products/:productId', component: ProductsComponent }, 
  { path: 'orders/products/details/:productId', component: ProductsDetailsComponent }, 
  { path: 'orders/product/category/:categoryId', component: CategoriesComponent }, 
  {
    path: '',
    redirectTo: 'customer/all',
    pathMatch: 'full',
  },
  
  { path: '**', redirectTo: '/customer/all' },  // Wildcard route for a page not found (no match customer wih id)
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
