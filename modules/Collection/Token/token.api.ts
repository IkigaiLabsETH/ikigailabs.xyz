import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { flip, path, uncurryN } from 'ramda'

export const collectionTokenApi = createApi({
  reducerPath: 'collectionTokenApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_EXPLORER_URL || 'https://api.reservoir.tools' }),
  endpoints: builder => ({
    getTokenByContractAndTokenId: builder.query<{ token: any }, {}>({
      query: ({ contract, tokenId }: { contract: string; tokenId: string }) =>
        `tokens/v5?tokens=${contract}:${tokenId}&includeTopBid=true&includeAttributes=true&normalizeRoyalties=true`,
      transformResponse: (response): any => path(['tokens', 0])(response),
    }),
  }),
})

export const { reducer } = collectionTokenApi

export const selector = flip(uncurryN(2, collectionTokenApi.endpoints.getTokenByContractAndTokenId.select))
