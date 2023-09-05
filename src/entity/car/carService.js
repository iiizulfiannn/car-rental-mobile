import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithReauth } from '../../shared/helper/baseQueryWithReauth';

export const carApi = createApi({
  reducerPath: 'carApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Car'],
  endpoints: (builder) => ({
    getAllCars: builder.query({
      query: (params = undefined) => ({
        url: '/car',
        method: 'GET',
        params,
      }),
      providesTags: ['Car'],
    }),
    getCarById: builder.query({
      query: (carId) => ({
        url: `/car/${carId}`,
        method: 'GET',
      }),
    }),
    addCar: builder.mutation({
      query: (body) => ({
        url: '/car',
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
      invalidatesTags: ['Car'],
    }),
    updateCar: builder.mutation({
      query: ({ carId, body }) => ({
        url: `/car/${carId}`,
        method: 'PUT',
        body,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
      invalidatesTags: ['Car'],
    }),
    deleteCarById: builder.mutation({
      query: (carId) => ({
        url: `/car/${carId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Car'],
    }),
  }),
});

export const {
  useLazyGetAllCarsQuery,
  useLazyGetCarByIdQuery,
  useAddCarMutation,
  useUpdateCarMutation,
  useDeleteCarByIdMutation,
} = carApi;
