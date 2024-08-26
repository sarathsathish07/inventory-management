import { apiSlice } from "./apiSlice.js";

const ADMIN_URL = "/api/admin";

export const admiApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    adminLogout: builder.mutation({
      query: () => ({
        url: `${ADMIN_URL}/logout`,
        method: "POST",
      }),
    }),
    addItem: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/add-item`,
        method: "POST",
        body: data,
      }),
    }),
    getItems: builder.query({
      query: () => ({
        url: `${ADMIN_URL}/items`,
        method: "GET",
      }),
    }),
    getBills: builder.query({
      query: () => `${ADMIN_URL}/get-bills`,
    }),
    getBillById: builder.query({
      query: (id) => `${ADMIN_URL}/get-bills/${id}`,
    }),
  }),
});

export const {
  useAdminLoginMutation,
  useAdminLogoutMutation,
  useAddItemMutation,
  useGetItemsQuery,
  useGetBillsQuery,
  useGetBillByIdQuery,
} = admiApiSlice;
