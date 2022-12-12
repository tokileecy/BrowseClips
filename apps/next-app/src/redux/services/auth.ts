import { AuthTokenData } from './types';
import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '../baseQuery';

interface LoginPayload {
  username: string;
  password: string;
}

export const authApi = createApi({
  reducerPath: 'api/auth',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    login: builder.mutation<AuthTokenData, LoginPayload>({
      query: (data) => ({ url: '/auth/login', method: 'post', data }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
