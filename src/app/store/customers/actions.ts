//https://v10.ngrx.io/guide/store/install
import { createAction, props } from '@ngrx/store';
import { Customer } from 'src/app/models/customer';

export const getCustomer = createAction(
  '[Customer/API] Get Customer',
  props<{ id: string }>()
);

export const getCustomerSuccess = createAction(
  '[Customer/API] Get Customer Success',
  props<{ customer: Customer }>()
);
