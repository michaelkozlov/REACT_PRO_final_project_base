import { baseApi } from 'shared/api/baseApi';

export interface IErrorResponse {
	data: { statusCode: number; message: string; error: string };
	status: number;
}

interface ProductsResponse {
	products: Product[];
	length: number;
}

interface SetLikeResponse {
	like: {
		id: string;
		userId: string;
		productId: string;
	};
	message: string;
}

interface DeleteLikeResponse {
	product: {
		id: string;
		userId: string;
		productId: string;
	};
	message: string;
}

interface ProductRequest {
	page: number;
	perPage?: number;
	sort: Sort;
	searchText: string;
}

const productsApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getProducts: builder.query<ProductsResponse, ProductRequest>({
			query: ({ searchText: searchTerm, sort, page, perPage }) => ({
				url: '/products',
				params: {
					sort,
					searchTerm: searchTerm.length ? searchTerm : undefined,
					perPage: perPage ? page * perPage : undefined,
				},
			}),
			providesTags: [{ type: 'Products', id: 'list' }],
		}),
		getProduct: builder.query<Product, Pick<Product, 'id'>>({
			query: ({ id }) => ({ url: `/products/${id}` }),
			providesTags: (productFromBE) =>
				productFromBE
					? [{ type: 'Products', id: productFromBE.id }]
					: [{ type: 'Products', id: 'UNKNOWN' }],
		}),
		createProduct: builder.mutation<Product, Product>({
			query: (product) => ({
				url: '/products',
				method: 'POST',
				body: product,
			}),
			invalidatesTags: [{ type: 'Products', id: 'list' }],
		}),
		deleteProduct: builder.mutation<Product, Pick<Product, 'id'>>({
			query: ({ id }) => ({
				url: `/products/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: (productFromBE) => [
				{ type: 'Products', id: 'list' },
				{ type: 'Products', id: productFromBE?.id },
			],
		}),
		setLikeProduct: builder.mutation<SetLikeResponse, Pick<Product, 'id'>>({
			query: ({ id }) => ({
				url: `/products/${id}/likes`,
				method: 'PUT',
			}),
			invalidatesTags: (result) =>
				result
					? [{ type: 'Products', id: result.like.productId }]
					: [{ type: 'Products', id: 'list' }],
		}),
		deleteLikeProduct: builder.mutation<
			DeleteLikeResponse,
			Pick<Product, 'id'>
		>({
			query: ({ id }) => ({
				url: `/products/${id}/likes`,
				method: 'DELETE',
			}),
			invalidatesTags: (result) =>
				result
					? [{ type: 'Products', id: result.product.productId }]
					: [{ type: 'Products', id: 'list' }],
		}),
	}),
});

export const {
	useGetProductQuery,
	useGetProductsQuery,
	useSetLikeProductMutation,
	useDeleteLikeProductMutation,
} = productsApi;
