import { startTransition, useActionState, useEffect, useState } from 'react';
import classNames from 'classnames';
import s from './ReviewForm.module.css';
import { Rating } from 'shared/ui/Rating';
import { Button } from 'shared/ui/Button/ui/Button';

interface IFormState {
	reviewText: string;
	rating: number;
	success?: boolean;
}

const initialState: IFormState = {
	reviewText: '',
	rating: 0,
	success: false,
};

const submitReview = async (prevState: IFormState, payload: IFormState) => {
	const { rating, reviewText } = payload;

	if (!reviewText || !rating) {
		return prevState;
	}

	console.log(reviewText, rating);
	await new Promise((res) => setTimeout(res, 1500));

	return {
		reviewText: '',
		rating: 0,
		success: true,
	};
};

export const ReviewForm = () => {
	const [state, action, isProgress] = useActionState(
		submitReview,
		initialState
	);

	const [comment, setComment] = useState('');
	const [rating, setRating] = useState(0);

	const handleSubmit = () => {
		startTransition(() => {
			action({ reviewText: comment, rating });
		});
	};

	useEffect(() => {
		if (state.success) {
			setComment('');
			setRating(0);
		}
	}, [state]);

	return (
		<form className={s['form']} onSubmit={(e) => e.preventDefault()}>
			<Rating isEdit rating={rating} onChange={setRating} />

			<textarea
				className={classNames(s['input'], s['textarea'])}
				name='reviewText'
				id='text'
				placeholder='Напишите текст отзыва'
				value={comment}
				onChange={(e) => setComment(e.target.value)}></textarea>

			<Button
				type='submit'
				className={classNames(s['form__btn'], s['pramary'])}
				onClick={handleSubmit}
				disabled={isProgress}>
				Отправить отзыв
			</Button>
		</form>
	);
};
