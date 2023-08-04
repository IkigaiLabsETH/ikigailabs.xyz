import { createAction } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query'

export const showAllowlist = createAction('allowlist/show/')

export const allowlistApi = createApi({
  reducerPath: 'allowlistApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: builder => ({
    signUp: builder.mutation<any, string>({
      query: address => ({
        url: 'allowlist',
        method: 'POST',
        body: {
          address,
        },
      }),
    }),
  }),
})

export const { signUp } = allowlistApi.endpoints
export const selectAllowlistSignUp = allowlistApi.endpoints.signUp.select
