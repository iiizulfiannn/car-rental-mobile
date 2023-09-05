import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query';

import { removeData } from './storage';
import { logout } from '../../entity/auth/authSlice';
import { API_URL } from '../config/authConfig';

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set('authorization', token);
    }
    return headers;
  },
});

export const baseQueryWithReauth = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    await removeData('account');
    api.dispatch(logout());
  }

  return result;
};
