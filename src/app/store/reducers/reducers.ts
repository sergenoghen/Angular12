import { ActionReducerMap } from '@ngrx/store';
import { AppState } from '../app.state';
import { customerDetailsReducer, customerOrderReducer } from './customer.reducer';

export const reducers: ActionReducerMap<AppState> = {
    orderState : customerOrderReducer,
    customerState: customerDetailsReducer,
};
 