import { configureStore } from '@reduxjs/toolkit';
import AppApi from '../../shared/api/ApiServise';
import { rootReducer } from './reducers/rootReducer';
import { apiMiddleware } from 'shared/api/baseApi';

export const store = configureStore({
	reducer: rootReducer,
	devTools: process.env.NODE_ENV !== 'production',
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			thunk: {
				extraArgument: AppApi,
			},
		}).concat(apiMiddleware),
});
