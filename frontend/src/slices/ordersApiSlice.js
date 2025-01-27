import { get } from "mongoose";
import { ORDERS_URL, PAYPAL_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const ordersApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (order) => ({
                url: ORDERS_URL,
                method: 'POST',
                body: { ...order },  //creates shallow copy of order, like xerox copy so no change in original
            })
        }),
        getOrderById: builder.query({
            query: (id) => ({
                url: `${ORDERS_URL}/${id}`,
            })
        }),
        payOrder: builder.mutation({
            query: ({ orderId, details }) => ({
                url: `${ORDERS_URL}/${orderId}/pay`,
                method: 'PUT',
                body: { ...details },  //creates shallow copy of order, like xerox copy so no change in original
            })
        }),
        getPaypalClientId: builder.query({
            query: () => ({
                url: PAYPAL_URL,
            }),
            keepUnusedDataFor: 5,
        }),
        getMyOrders: builder.query({
            query: () => ({
                url: `${ORDERS_URL}/myOrders`,
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Order'],
        }),
        getOrders: builder.query({
            query: () => ({
                url: ORDERS_URL,
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Order'],
        }),
        deliverOrder : builder.mutation({
            query: (orderId) => ({
                url: `${ORDERS_URL}/${orderId}/deliver`,
                method: 'PUT',

            }),
        }),
    }),
});

export const { useCreateOrderMutation, useGetOrderByIdQuery, usePayOrderMutation, useGetPaypalClientIdQuery, useGetMyOrdersQuery, useGetOrdersQuery, useDeliverOrderMutation } = ordersApi;