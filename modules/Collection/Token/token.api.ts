import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { path } from 'ramda'

export const collectionTokenApi = createApi({
  reducerPath: 'collectionTokenApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.EXPLORER_URL || 'https://api-goerli.reservoir.tools' }),
  endpoints: builder => ({
    getTokenByContractAndTokenId: builder.query<{ token: any }, {}>({
      query: ({ contract, tokenId }: { contract: string, tokenId: string }) =>
        `tokens/v5?tokens=${contract}:${tokenId}&includeTopBid=true&includeAttributes=true&normalizeRoyalties=true`,
      transformResponse: (response): any => path(['tokens', 0])(response)
    }),
  }),
})

export const { reducer } = collectionTokenApi
