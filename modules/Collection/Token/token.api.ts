import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { flip, path, uncurryN } from 'ramda'

import { NFT, Network } from '../../../common/types'

export const collectionTokenApi = createApi({
  reducerPath: 'collectionTokenApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/reservoir' }),
  endpoints: builder => ({
    getTokenByContractAndTokenId: builder.query<
      { token: any },
      { contract: string; tokenId: string; network: Network }
    >({
      query: ({ contract, tokenId, network }) =>
        `${network}/tokens/v5?tokens=${contract}:${tokenId}&includeTopBid=true&includeAttributes=true&normalizeRoyalties=true`,
      transformResponse: (response): NFT => path(['tokens', 0])(response) as NFT,
    }),
  }),
})

export const { reducer } = collectionTokenApi

export const selector = flip(uncurryN(2, collectionTokenApi.endpoints.getTokenByContractAndTokenId.select))
