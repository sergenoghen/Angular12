import {createReducer, on } from '@ngrx/store';
import * as customerActions from '../customers/actions';
import * as orderActions from '../orders/actions';
import { Customer } from '../../models/customer';
import { CustomerState } from '../customers/adapter';
import { OrderState } from '../orders/adapter';

export const customerInitialState = {} as CustomerState;
export const orderInitialState = {} as OrderState;

export const customerDetailsReducer = createReducer(
    customerInitialState,
    on(customerActions.getCustomerSuccess, (state, action) => ({
        ...state,
        ...action.customer,
      }))
);

export const customerOrderReducer = createReducer(
    orderInitialState,
    on(orderActions.getCustomerOrdersSuccess, (state, action) => ({
        ...state,
        ...action.order,
      }))
);

