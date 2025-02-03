import { PRODUCTS_URL, UPLOAD_URL } from '../constants';
import { updateCart } from '../utils/cartUtils';
import { apiSlice } from './apiSlice';

export const productsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ({
                url: PRODUCTS_URL,
            }),
            keepUnusedDataFor: 5,
        }),
        getProductById: builder.query({
            query: (id) => ({
                url: `${PRODUCTS_URL}/${id}`,
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Product'],
        }),
        createProduct: builder.mutation({
            query: () => ({
                url: `${PRODUCTS_URL}`,
                method: 'POST',
            }),
            invalidatesTags: ['Product'],
        }),
        updateProduct: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/${data._id}/edit`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Product'],
        }),
        uploadProductImage: builder.mutation({
            query: (data) => ({
                url: `${UPLOAD_URL}`,
                method: 'POST',
                body: data,
            }),
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `${PRODUCTS_URL}/${id}`,
                method: 'DELETE',    
            }),
            invalidatesTags: ['Product'],
        }),
        createReview: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/${data.productId}/reviews`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Product'],
        }),
    })
});

export const { useGetProductsQuery, useGetProductByIdQuery , useCreateProductMutation, useUpdateProductMutation, useUploadProductImageMutation, useDeleteProductMutation, useCreateReviewMutation} = productsApi;