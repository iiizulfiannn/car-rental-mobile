import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithReauth } from '../../shared/helper/baseQueryWithReauth';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: () => ({
        url: '/user',
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
  }),
});

export const { useLazyGetAllUserQuery } = userApi;
