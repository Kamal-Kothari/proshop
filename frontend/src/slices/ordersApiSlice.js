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
    }),
});

export const { useCreateOrderMutation, useGetOrderByIdQuery, usePayOrderMutation, useGetPaypalClientIdQuery } = ordersApi;