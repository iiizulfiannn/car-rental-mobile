import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_URL } from '../../shared/config/authConfig';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  endpoints: (builder) => ({
    signin: builder.mutation({
      query: ({ body }) => ({
        url: '/auth/signin',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useSigninMutation } = authApi;
