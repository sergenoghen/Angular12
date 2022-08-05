import { CustomerState } from './customers/adapter';

export interface AppState {
	customerState: CustomerState;
}