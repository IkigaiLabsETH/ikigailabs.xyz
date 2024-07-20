import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { empty, flip, isNil, map, path, pipe, pluck, reject, tap, uncurryN, uniqBy } from 'ramda'

import { Activity, ActivityType, NFT, Network, Order } from '../../../common/types'
import { FEATURES } from '../../../common/config'
import { createSelector } from '@reduxjs/toolkit'

export const collectionTokenApi = createApi({
  reducerPath: 'collectionTokenApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/reservoir' }),
  endpoints: builder => ({
    getTokenByContractAndTokenId: builder.query<NFT, { contract: string; tokenId: string; network: Network }>({
      query: ({ contract, tokenId, network }) =>
        `${network}/tokens/v7?tokens=${contract}:${tokenId}&includeDynamicPricing=true&includeAttributes=true&includeTopBid=true&includeQuantity=true&normalizeRoyalties=false`,
      transformResponse: (response): NFT => path(['tokens', 0])(response) as NFT,
    }),
    getTokenActivity: builder.query<
      { activities: Activity[]; continuation: string | null },
      {
        contract: string
        tokenId: string
        network: Network
        selectedActivityTypes?: ActivityType[]
        continuation?: string
      }
    >({
      query: ({ contract, tokenId, network, selectedActivityTypes = [], continuation = '' }) => {
        const activityTypes = selectedActivityTypes.map(type => `types=${type}`).join('&')
        return `${network}/tokens/${contract}:${tokenId}/activity/v5?${
          selectedActivityTypes.length ? `${activityTypes}` : ''
        }${continuation ? `&continuation=${continuation}` : ''}`
      },
      serializeQueryArgs: ({ endpointName, queryArgs: { selectedActivityTypes = [], contract, tokenId } }) => {
        const activityTypes = selectedActivityTypes.map(type => `types=${type}`).join('&')
        return `${endpointName}-${contract}-${tokenId}-${activityTypes}`
      },
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems) => {
        currentCache.activities = [...currentCache.activities, ...newItems.activities]
        currentCache.continuation = newItems.continuation
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
      },
    }),
    getTokenListings: builder.query<
      { orders: Order[]; continuation: string | null },
      { contract: string; tokenId: string; network: Network; continuation?: string }
    >({
      query: ({ contract, tokenId, network, continuation = '' }) =>
        `${network}/orders/asks/v5?token=${contract}:${tokenId}&includeCriteriaMetadata=true&includeRawData=true&sortBy=price&normalizeRoyalties=false${
          continuation ? `&continuation=${continuation}` : ''
        }`,
      serializeQueryArgs: ({ endpointName, queryArgs: { contract, tokenId } }) => {
        return `${endpointName}-${contract}-${tokenId}`
      },
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems) => {
        currentCache.orders = uniqBy(path(['id']), [...currentCache.orders, ...newItems.orders])
        currentCache.continuation = newItems.continuation
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
      },
    }),
    getTokenOffers: builder.query<
      { orders: Order[]; continuation: string | null },
      { contract: string; tokenId: string; network: Network; continuation?: string }
    >({
      query: ({ contract, tokenId, network, continuation }) =>
        `${network}/orders/bids/v6?token=${contract}:${tokenId}&includeCriteriaMetadata=true&includeRawData=true&sortBy=price&normalizeRoyalties=false${
          continuation ? `&continuation=${continuation}` : ''
        }`,
      serializeQueryArgs: ({ endpointName, queryArgs: { contract, tokenId } }) => {
        return `${endpointName}-${contract}-${tokenId}`
      },
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems) => {
        currentCache.orders = uniqBy(path(['id']), [...currentCache.orders, ...newItems.orders])
        currentCache.continuation = newItems.continuation
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
      },
    }),
  }),
})

export const { reducer } = collectionTokenApi

export const selectTokenByContract = flip(uncurryN(2, collectionTokenApi.endpoints.getTokenByContractAndTokenId.select))
export const selectTokensByContractNetworkAndTokenId = createSelector(
  [state => state.collectionTokenApi, (state, tokensToSelect) => tokensToSelect],
  ({ queries }, tokensToSelect) => {
    return pipe(
      map((tokenToSelect: any) => queries[`getTokenByContractAndTokenId(${JSON.stringify(tokenToSelect)})`]),
      pluck('data'),
      reject(isNil),
    )(tokensToSelect)
  },
)
