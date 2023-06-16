import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const token = createApi({
  reducerPath: 'token',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: builder => ({
    getToken: builder.query<{ token: any }, {}>({
      query: ({ contract, tokenId }: { contract: string; tokenId: string }) =>
        `drop/${contract}/token/${tokenId}?network={network}`,
    }),
    getTokenMetadata: builder.query<{ token: any }, {}>({
      query: ({ contract, tokenId }: { contract: string; tokenId: string }) =>
        `drop/${contract}/token/${tokenId}/metadata?network={network}`,
    }),
  }),
})

export const { getToken, getTokenMetadata } = token.endpoints
