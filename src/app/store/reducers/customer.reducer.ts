import {createReducer, on } from '@ngrx/store';
import * as fromActions from '../customers/actions';
import { Customer } from '../../models/customer';
import { CustomerState } from '../customers/adapter';

export const customerInitialState = {} as CustomerState;

export const customerDetailsReducer = createReducer(
    customerInitialState,
    on(fromActions.getCustomerSuccess, (state, action) => ({
        ...state,
        ...action.customer,
      }))
);

