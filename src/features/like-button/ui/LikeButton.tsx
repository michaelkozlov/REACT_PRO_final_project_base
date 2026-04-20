import s from './LikeButton.module.css';
import { ReactComponent as LikeSvg } from '../../../shared/assets/icons/like.svg';
import classNames from 'classnames';
import { useAppSelector } from 'app/store/utils';
import { userSelectors } from 'app/store/slices/user';
import {
	useSetLikeProductMutation,
	useDeleteLikeProductMutation,
} from 'app/store/api/productsApi';

import type { IErrorResponse } from 'app/store/api/productsApi';
import { toast } from 'react-toastify';
import { Button } from 'shared/ui/Button/ui/Button';
import { memo, useMemo, useOptimistic, useState, useTransition } from 'react';

type TLikeButtonProps = {
	product: Product;
};
export const LikeButtonComponent = ({ product }: TLikeButtonProps) => {
	const accessToken = useAppSelector(userSelectors.getAccessToken);
	const user = useAppSelector(userSelectors.getUser);

	const [setLike] = useSetLikeProductMutation();
	const [deleteLike] = useDeleteLikeProductMutation();

	const isLikedFromServer = useMemo(
		() => product?.likes.some((l) => l.userId === user?.id),
		[product?.likes, user?.id]
	);

	const [isLiked, setIsLiked] = useState(isLikedFromServer);

	const [isPending, startTransition] = useTransition();
	const [optimisticIsLiked, setOptimisticIsLiked] = useOptimistic(
		isLiked,
		(isLiked: boolean) => !isLiked
	);

	const toggleLike = async () => {
		if (!accessToken) {
			toast.warning('Вы не авторизованы');
			return;
		}

		startTransition(async () => {
			setOptimisticIsLiked(!isLiked);

			let response;
			if (isLiked) {
				response = await deleteLike({ id: `${product.id}` });
			} else {
				response = await setLike({ id: `${product.id}` });
			}

			if (response.error) {
				const error = response.error as IErrorResponse;
				toast.error(error.data.message);
			} else startTransition(async () => setIsLiked(!isLiked));
		});
	};

	return (
		<Button
			className={classNames(s['card__favorite'], {
				[s['card__favorite_is-active']]: optimisticIsLiked,
			})}
			disabled={isPending}
			onClick={toggleLike}>
			<LikeSvg />
		</Button>
	);
};

export const LikeButton = memo(LikeButtonComponent);
