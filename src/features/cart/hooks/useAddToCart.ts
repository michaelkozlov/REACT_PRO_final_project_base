import { cartActions } from '../../../app/store/slices/cart';
import { useAppDispatch } from '../../../app/store/utils';

export const useAddToCart = () => {
	const dispatch = useAppDispatch();
	const addProductToCart = (cartProduct: CartProduct) => {
		dispatch(cartActions.addCartProduct(cartProduct));
	};

	return { addProductToCart };
};
