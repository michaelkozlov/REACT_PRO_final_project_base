import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQuery } from 'app/store/api/config';

export const baseApi = createApi({
	reducerPath: 'api',
	baseQuery: customBaseQuery,
	tagTypes: ['Auth', 'Products'],
	endpoints: () => ({}),
});

export const apiReducer = baseApi.reducer;
export const apiMiddleware = baseApi.middleware;
