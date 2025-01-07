import { apiSlice } from "./apiSlice"
import { USERS_URL } from "../constants"

export const usersApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login : builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: 'POST',
                body: data,
            }),
        })
    })
});

export const {useLoginMutation} = usersApi;