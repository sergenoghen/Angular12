import { createFeatureSelector, createSelector, createReducer, on, Action } from '@ngrx/store';
import { OrderState } from '../orders/adapter';

export const getOrderState = createFeatureSelector<OrderState[]>('customerOrders');

export const selectCustomerOrders = createSelector(
    getOrderState, 
    (state: OrderState[]) => state
);