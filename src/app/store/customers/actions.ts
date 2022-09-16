 //https://v10.ngrx.io/guide/store/install
import { createAction, props } from '@ngrx/store';
import { Customer } from 'src/app/models/customer';
import { Order } from 'src/app/models/order';

export const getCustomer = createAction(
  '[Customer/API] Get Customer',
  props<{ id: string }>()
);

export const getCustomerSuccess = createAction(
  '[Customer/API] Get Customer Success',
  props<{ customer: Customer }>()
);

export const getCustomerOrders = createAction(
  '[Order/API] Get Order',
  props<{ id: string }>()
);

export const getCustomerOrdersSuccess = createAction(
  '[Order/API] Get Order Success',
  props<{ order: Order[] }>()
);