import { createBrowserRouter } from 'react-router-dom';

import { HomePage } from '../../../../pages/HomePage';
import { ProductPage } from '../../../../pages/ProductPage';
import { NotFoundPage } from '../../../../pages/NotFoundPage';
import { ProfilePage } from '../../../../pages/ProfilePage';
import { FavoritesPage } from '../../../../pages/FavoritesPage';
import { App } from '../../../../app';
import { SignUpPage } from '../../../../pages/SignUpPage';
import { SignInPage } from '../../../../pages/SignInPage';
import { CartPage } from '../../../../pages/CartPage';

export const AppRoutes = {
	HOME: 'home',
	FAVORITES: 'favorites',
	PROFILE: 'profile',
	PRODUCTS: 'products',
	CART: 'cart',
	SIGNUP: 'signup',
	SIGNIN: 'signin',
	NOT_FOUND: 'not_found',
} as const;

export type AppRoutesType = (typeof AppRoutes)[keyof typeof AppRoutes];

export const RoutePath: Record<AppRoutesType, `/${string}` | '*'> = {
	[AppRoutes.HOME]: '/',
	[AppRoutes.FAVORITES]: '/favorites',
	[AppRoutes.PRODUCTS]: '/products/:productId',
	[AppRoutes.PROFILE]: '/profile',
	[AppRoutes.CART]: '/cart',
	[AppRoutes.SIGNUP]: '/signup',
	[AppRoutes.SIGNIN]: '/signin',
	[AppRoutes.NOT_FOUND]: '*',
};

export const router = createBrowserRouter([
	{
		path: RoutePath.home,
		element: <App />,
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{
				path: RoutePath.favorites,
				element: <FavoritesPage />,
			},
			{
				path: RoutePath.products,
				element: <ProductPage />,
			},
			{
				path: RoutePath.profile,
				element: <ProfilePage />,
			},
			{
				path: RoutePath.cart,
				element: <CartPage />,
			},
			{
				path: RoutePath.signup,
				element: <SignUpPage />,
			},
			{
				path: RoutePath.signin,
				element: <SignInPage />,
			},

			// last route
			{
				path: RoutePath.not_found,
				element: <NotFoundPage />,
			},
		],
	},
]);
