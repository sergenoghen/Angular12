//https://v10.ngrx.io/guide/store/install
import { createAction, props } from '@ngrx/store';
import { Order } from 'src/app/models/order';

export const getCustomerOrders = createAction(
  '[Order/API] Get Order',
  props<{ id: string }>()
);

export const getCustomerOrdersSuccess = createAction(
  '[Order/API] Get Order Success',
  props<{ order: Order[] }>()
);
