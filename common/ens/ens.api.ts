import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const ensApi = createApi({
  reducerPath: 'ensApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.ensideas.com/ens/resolve/',
  }),
  endpoints: (builder) => ({
    getEnsName: builder.query<string, string>({
      query: (address) => `${address}`,
    }),
  }),
})

export const { getEnsName } = ensApi.endpoints
export const { reducer } = ensApi

export const selectENSByAddress = ensApi.endpoints.getEnsName.select
