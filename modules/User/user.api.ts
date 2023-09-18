import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { uniq } from 'ramda'

import { Network } from '../../common/types'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/reservoir' }),
  endpoints: builder => ({
    getOwnedTokens: builder.query<any, { address: string; continuation?: string; network: Network }>({
      query: ({ address, continuation, network }) =>
        `${network}/users/${address}/tokens/v7?limit=4${continuation ? `&continuation=${continuation}` : ''}`,
      serializeQueryArgs: ({ queryArgs: { address, network } }) => `tokens-${network}-${address}`,
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems) => {
        currentCache.tokens = uniq([...currentCache.tokens, ...newItems.tokens])
        currentCache.continuation = newItems.continuation
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
      },
    }),
    getUserActivity: builder.query<any, { address: string; continuation?: string; network: Network }>({
      query: ({ address, continuation, network }) =>
        `${network}/users/activity/v6?users=${address}${continuation ? `&continuation=${continuation}` : ''}`,
      serializeQueryArgs: ({ queryArgs: { address, network } }) => `activity-${network}-${address}`,
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems) => {
        currentCache.activities = uniq([...currentCache.activities, ...newItems.activities])
        currentCache.continuation = newItems.continuation
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
      },
    }),
    getUserOffers: builder.query<any, { address: string; continuation?: string; network: Network }>({
      query: ({ address, continuation, network }) =>
        `${network}/orders/bids/v5?maker=${address}${continuation ? `&continuation=${continuation}` : ''}`,
      serializeQueryArgs: ({ queryArgs: { address, network } }) => `offers-${network}-${address}`,
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems) => {
        currentCache.offers = uniq([...currentCache.offers, ...newItems.offers])
        currentCache.continuation = newItems.continuation
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
      },
    }),
    getUserListings: builder.query<any, { address: string; continuation?: string; network: Network }>({
      query: ({ address, continuation, network }) =>
        `${network}/orders/asks/v5?maker=${address}${continuation ? `&continuation=${continuation}` : ''}`,
      serializeQueryArgs: ({ queryArgs: { address, network } }) => `listings-${network}-${address}`,
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems) => {
        currentCache.listings = uniq([...currentCache.listings, ...newItems.listings])
        currentCache.continuation = newItems.continuation
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
      },
    }),
  }),
})

export const selectCollectedTokens = userApi.endpoints.getOwnedTokens.select
export const selectUserActivity = userApi.endpoints.getUserActivity.select
export const selectUserOffers = userApi.endpoints.getUserOffers.select
export const selectUserListings = userApi.endpoints.getUserListings.select
