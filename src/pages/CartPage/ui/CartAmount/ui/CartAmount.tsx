import { Button } from 'shared/ui/Button/ui/Button';
import s from '../../CartPage.module.css';
import classNames from 'classnames';
import { useConfirmDialog } from 'shared/ui/ConfirmDialog/useConfirmDialog';
import { ConfirmDialog } from 'shared/ui/ConfirmDialog/ConfirmDialog';
import styles from './CartAmount.module.css';

type CartAmountProps = {
	products: CartProduct[];
};
export const CartAmount = ({ products }: CartAmountProps) => {
	const allPrice = products.reduce((acc, p) => p.price * p.count + acc, 0);
	const allDiscount = products.reduce(
		(acc, p) => p.discount * p.count + acc,
		0
	);

	const handleSubmitCart = async () => {
		const result = await showConfirmDialog({
			title: 'Подтвердить заказ?',
			subtitle: '',
		});

		if (result) {
			const order = products.map((p) => ({ id: p.id, count: p.count }));
			alert(`Заказ ${JSON.stringify(order, null, 2)} оформлен!`);
		}
	};

	const { isOpen, onCancel, onConfirm, options, showConfirmDialog } =
		useConfirmDialog();

	return (
		<>
			<div className={classNames(s['cart-amount'])}>
				<h1 className={classNames(s['cart-amount__title'])}>Ваша корзина</h1>
				<div className={classNames(s['cart-amount__table'])}>
					<div className={classNames(s['cart-amount__table-row'])}>
						<span className={classNames(s['cart-amount__table-title'])}>
							{`Товары (${products.length})`}
						</span>
						<span className={classNames(s['cart-amount__table-value'])}>
							{`${allPrice} ₽`}
						</span>
					</div>
					<div className={classNames(s['cart-amount__table-row'])}>
						<span className={classNames(s['cart-amount__table-title'])}>
							Скидка
						</span>
						<span
							className={classNames(
								s['cart-amount__table-value'],
								s['cart-amount__table-value-discount']
							)}>
							{`${allDiscount} ₽`}
						</span>
					</div>
				</div>
				<div className={classNames(s['cart-amount__total-cost'])}>
					<h2 className={classNames(s['cart-amount__total-cost-title'])}>
						Общая стоимость
					</h2>
					<span className={classNames(s['cart-amount__total-cost-value'])}>
						{`${allPrice - allDiscount} ₽`}
					</span>
				</div>

				<Button
					variant='primary'
					size='small'
					onClick={handleSubmitCart}
					className={styles.confirmButton}>
					Оформить заказ
				</Button>
			</div>

			<ConfirmDialog
				isOpen={isOpen}
				title={options?.title ?? ''}
				subtitle={options?.subtitle ?? ''}
				onConfirm={onConfirm}
				onCancel={onCancel}
			/>
		</>
	);
};
