import { createFeatureSelector, createSelector, createReducer, on, Action } from '@ngrx/store';
import { CustomerState } from '../customers/adapter';

export const getCustomerState = createFeatureSelector<CustomerState>('customerDetails');

export const selectCustomerDetails = createSelector(
    getCustomerState, 
    (state: CustomerState) => state
);