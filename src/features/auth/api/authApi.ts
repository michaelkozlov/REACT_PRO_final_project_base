import { baseApi } from 'shared/api/baseApi';
import type { TSignUpFormValues } from '../sign-up/model/types';

type SignUpResponse = {
	user: Pick<User, 'id' | 'email'>;
	accessToken: Token['accessToken'];
};

type SignInResponse = {
	user: Pick<User, 'id' | 'email'>;
	accessToken: Token['accessToken'];
};

const authApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		signUp: builder.mutation<SignUpResponse, TSignUpFormValues>({
			query: (signUpFormValues) => ({
				url: '/auth/register',
				method: 'POST',
				body: signUpFormValues,
			}),
			invalidatesTags: ['Auth'],
		}),
		signIn: builder.mutation<SignInResponse, TSignUpFormValues>({
			query: (signInFormValues) => ({
				url: '/auth/login',
				method: 'POST',
				body: signInFormValues,
			}),
			invalidatesTags: ['Auth'],
		}),
	}),
});

export const { useSignInMutation, useSignUpMutation } = authApi;
