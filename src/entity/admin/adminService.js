import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithReauth } from '../../shared/helper/baseQueryWithReauth';

export const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Admin'],
  endpoints: (builder) => ({
    registerToken: builder.mutation({
      query: (body) => ({
        url: '/admin/notification/register',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useRegisterTokenMutation } = adminApi;
