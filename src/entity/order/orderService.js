import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithReauth } from '../../shared/helper/baseQueryWithReauth';

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Order'],
  endpoints: (builder) => ({
    getAllOrder: builder.query({
      query: (params = undefined) => ({
        url: '/order',
        method: 'GET',
        params,
      }),
      providesTags: ['Order'],
    }),
    getOrderById: builder.query({
      query: (orderId) => ({
        url: `/order/${orderId}`,
        method: 'GET',
      }),
    }),
    addOrder: builder.mutation({
      query: (body) => ({
        url: '/order',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Order'],
    }),
    updateOrder: builder.mutation({
      query: ({ orderId, body }) => ({
        url: `/order/${orderId}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Order'],
    }),
    deleteOrderById: builder.mutation({
      query: (orderId) => ({
        url: `/order/${orderId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Order'],
    }),
  }),
});

export const {
  useLazyGetAllOrderQuery,
  useAddOrderMutation,
  useLazyGetOrderByIdQuery,
  useUpdateOrderMutation,
  useDeleteOrderByIdMutation,
} = orderApi;
