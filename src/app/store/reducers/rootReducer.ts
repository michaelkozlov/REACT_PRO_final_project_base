import { combineReducers } from 'redux';
import { userSlice } from '../slices/user';
import { cartSlice } from '../slices/cart';
import { productsSlice } from '../slices/products';
import { apiReducer } from 'shared/api/baseApi';

export const rootReducer = combineReducers({
	[userSlice.name]: userSlice.reducer,
	[cartSlice.name]: cartSlice.reducer,
	[productsSlice.name]: productsSlice.reducer,
	api: apiReducer,
});
