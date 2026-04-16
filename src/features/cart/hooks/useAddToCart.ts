import { useCallback } from 'react';
import { cartActions } from '../../../app/store/slices/cart';
import { useAppDispatch } from '../../../app/store/utils';

export const useAddToCart = () => {
	const dispatch = useAppDispatch();

	const addProductToCart = useCallback(
		(cartProduct: CartProduct) => {
			dispatch(cartActions.addCartProduct(cartProduct));
		},
		[dispatch]
	);

	return { addProductToCart };
};
