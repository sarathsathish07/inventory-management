import { apiSlice } from "./apiSlice.js";

const USERS_URL = "/api/users";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),

    getProducts: builder.query({
      query: () => ({
        url: `${USERS_URL}/products`,
        method: "GET",
      }),
    }),
    createBill: builder.mutation({
      query: (billData) => ({
        url: `${USERS_URL}/bills`,
        method: "POST",
        body: billData,
      }),
    }),
    updateItemQuantity: builder.mutation({
      query: ({ _id, quantity }) => ({
        url: `${USERS_URL}/items/${_id}`,
        method: "PATCH",
        body: { quantity },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useGetProductsQuery,
  useCreateBillMutation,
  useUpdateItemQuantityMutation,
} = usersApiSlice;
