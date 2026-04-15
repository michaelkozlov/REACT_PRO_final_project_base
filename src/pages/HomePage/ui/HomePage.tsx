import { WithProtection } from 'app/store/HOCs/WithProtection';
import { WithQuery } from 'app/store/HOCs/WithQuery';
import { CardList } from 'widgets/CardList';
import { useProducts } from 'app/store/hooks/useProducts';
import { LoadMore } from 'features/load-more';

const CardListWithQuery = WithQuery(CardList);

export const HomePage = WithProtection(() => {
	const { products, isLoading, isError, error } = useProducts();

	return (
		<>
			<CardListWithQuery
				title='Лакомства'
				isLoading={isLoading}
				isError={isError}
				products={products}
				error={error}
			/>
			<LoadMore />
		</>
	);
});
