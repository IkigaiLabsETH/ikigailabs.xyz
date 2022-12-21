import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query'
import { http } from '../../common/http'
import { HTTP } from '../../common/types'

export const showAllowlist = createAction('allowlist/show/')

export const joinAllowlistTh = (http: HTTP) =>
  createAsyncThunk<Promise<{} | Error>, { address: string }>('allowlist/join', ({ address }, { rejectWithValue }) =>
    http
      .post('allowlist', { address })
      .then(response => response)
      .catch(error => rejectWithValue(error.response.data.error)),
  )

export const joinAllowlist = joinAllowlistTh(http)

export const allowlistApi = createApi({
  reducerPath: 'allowlistApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
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
