import { ActionReducerMap } from '@ngrx/store';
import { AppState } from '../app.state';
import { customerDetailsReducer } from './customer.reducer';

export const reducers: ActionReducerMap<AppState> = {
    customerState: customerDetailsReducer,
};
 