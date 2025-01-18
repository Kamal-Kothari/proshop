import { ORDERS_URL } from "../constants";
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
    }),
});

export const { useCreateOrderMutation, useGetOrderByIdQuery } = ordersApi;