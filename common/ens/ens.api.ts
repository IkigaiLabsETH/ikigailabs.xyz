import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query'

export const ensApi = createApi({
  reducerPath: 'ensApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.ensideas.com/ens/resolve' }),
  endpoints: builder => ({
    lookupAddress: builder.query<
      { address: string; displayName: string; avatar: string; name: string },
      { address: string }
    >({
      query: ({ address }) => address,
    }),
  }),
})

export const { lookupAddress } = ensApi.endpoints
export const { reducer } = ensApi

export const selectENSByAddress = ensApi.endpoints.lookupAddress.select
