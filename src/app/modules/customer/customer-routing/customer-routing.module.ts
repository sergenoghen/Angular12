import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from 'src/app/pages/page-not-found/page-not-found.component';
import { CustomerDetailsComponent } from 'src/app/pages/customers/customer-details/customer-details.component';
import { CustomersComponent } from 'src/app/pages/customers/customer/customers.component';

const routes: Routes = [
  { path: 'details/:id', component: CustomerDetailsComponent },
  {
    path: '',
    redirectTo: 'customers/all',
    pathMatch: 'full',
  },
  { path: '**', redirectTo: '/customers/all' },  // Wildcard route for a page not found (no match customer wih id)
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
