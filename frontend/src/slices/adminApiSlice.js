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
    adminUpdateUser: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/update-user`,
        method: "PUT",
        body: data,
      }),
    }),
    getUserData: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/get-user`,
        method: "POST",
      }),
    }),
    deleteUserData: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/delete-user`,
        method: "DELETE",
        body: data,
      }),
    }),
    addNewUser: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/add-user`,
        method: "POST",
        body: data,
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
  useAdminUpdateUserMutation,
  useGetUserDataMutation,
  useDeleteUserDataMutation,
  useAddNewUserMutation,
  useAddItemMutation,
  useGetItemsQuery,
  useGetBillsQuery,
  useGetBillByIdQuery,
} = admiApiSlice;
