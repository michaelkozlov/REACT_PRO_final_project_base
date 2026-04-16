import { cartActions, cartSelectors } from 'app/store/slices/cart';
import { useAppSelector } from 'app/store/utils';
import { useCallback, useMemo, type ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';

const MIN_COUNT = 1;
const MAX_COUNT = 99;

export const useCount = (productId: string) => {
	const dispatch = useDispatch();
	const products = useAppSelector(cartSelectors.getCartProducts);
	const product = useMemo(
		() => products.find((p) => p.id === productId) as CartProduct,
		[productId, products]
	);

	const { id, count, stock } = product;

	const handleIncrement = useCallback(() => {
		const newCount = count + 1;
		const validCount = newCount > MAX_COUNT ? MAX_COUNT : newCount;
		dispatch(cartActions.setCartProductCount({ id, count: validCount }));
	}, [count, dispatch, id]);

	const handleDecrement = useCallback(() => {
		const newCount = count - 1;
		const validCount = newCount < MIN_COUNT ? MIN_COUNT : newCount;
		dispatch(cartActions.setCartProductCount({ id, count: validCount }));
	}, [count, dispatch, id]);

	const handleSetCount = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			const newCount = +e.target.value;
			const validCount =
				newCount > MAX_COUNT
					? MAX_COUNT
					: newCount < MIN_COUNT
					? MIN_COUNT
					: newCount;
			dispatch(cartActions.setCartProductCount({ id, count: validCount }));
		},
		[dispatch, id]
	);

	return { count, stock, handleSetCount, handleIncrement, handleDecrement };
};
