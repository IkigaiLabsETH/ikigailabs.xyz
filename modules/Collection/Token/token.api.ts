import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { flip, path, uncurryN } from 'ramda'

import { Activity, NFT, Network, Order } from '../../../common/types'

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
    getTokenActivity: builder.query<
      { activities: Activity[] },
      { contract: string; tokenId: string; network: Network }
    >({
      query: ({ contract, tokenId, network }) => `${network}/tokens/${contract}:${tokenId}/activity/v5`,
    }),
    getTokenListings: builder.query<
      { orders: Order[]; continuation: string | null },
      { contract: string; tokenId: string; network: Network }
    >({
      query: ({ contract, tokenId, network }) =>
        `${network}/orders/asks/v5?token=${contract}:${tokenId}&includeCriteriaMetadata=true&includeRawData=true&sortBy=price&normalizeRoyalties=false`,
    }),
    getTokenOffers: builder.query<
      { orders: Order[]; continuation: string | null },
      { contract: string; tokenId: string; network: Network }
    >({
      query: ({ contract, tokenId, network }) =>
        `${network}/orders/bids/v5?token=${contract}:${tokenId}&includeCriteriaMetadata=true&includeRawData=true&sortBy=price&normalizeRoyalties=false`,
    }),
  }),
})

export const { reducer } = collectionTokenApi

export const selectTokenByContract = flip(uncurryN(2, collectionTokenApi.endpoints.getTokenByContractAndTokenId.select))
