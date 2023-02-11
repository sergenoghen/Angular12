import { CustomerState } from './customers/adapter';
import { OrderState } from './orders/adapter';

export interface AppState {
	customerState: CustomerState,
	orderState: OrderState;
}