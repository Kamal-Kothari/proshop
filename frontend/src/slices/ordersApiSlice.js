import { ORDERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const ordersApi = apiSlice.injectEndpoints({
    endpoints : (builder)=> ({
        createOrder : builder.mutation({
            query : (order)=> ({
                url : ORDERS_URL,
                method : 'POST',
                body : {...order},  //creates shallow copy of order, like xerox copy so no change in original
            })
        }),
    }),
});

export const {useCreateOrderMutation} = ordersApi;