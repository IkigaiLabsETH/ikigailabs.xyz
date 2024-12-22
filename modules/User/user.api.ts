import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { uniq } from 'ramda'

import { Activity, ActivityType, Network } from '../../common/types'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/reservoir' }),
  endpoints: builder => ({
    getOwnedTokens: builder.query<any, { address: string; continuation?: string; network: Network }>({
      query: ({ address, continuation, network }) =>
        `${network}/users/${address}/tokens/v7?limit=20&excludeSpam=true${
          continuation ? `&continuation=${continuation}` : ''
        }`,
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
    getUserActivity: builder.query<
      { activities: Activity[]; continuation: string },
      { address: string; continuation?: string; network: Network; selectedActivityTypes?: ActivityType[] }
    >({
      query: ({ address, continuation, network, selectedActivityTypes = [] }) => {
        const activityTypes = selectedActivityTypes.map(type => `&types=${type}`).join('&')
        return `${network}/users/activity/v6?sortBy=eventTimestamp&includeMetadata=true&users=${address}${
          selectedActivityTypes.length ? `${activityTypes}` : ''
        }${continuation ? `&continuation=${continuation}` : ''}`
      },
      serializeQueryArgs: ({ queryArgs: { address, network, selectedActivityTypes = [] } }) => {
        const activityTypes = selectedActivityTypes.map(type => `types=${type}`).join('&')
        return `activity-${network}-${address}-${activityTypes}`
      },
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
    getUserBidsMade: builder.query<any, { address: string; continuation?: string; network: Network }>({
      query: ({ address, continuation, network }) =>
        `${network}/orders/bids/v6?maker=${address}${continuation ? `&continuation=${continuation}` : ''}`,
      serializeQueryArgs: ({ queryArgs: { address, network } }) => `bids-${network}-${address}`,
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems) => {
        currentCache.orders = uniq([...currentCache.orders, ...newItems.orders])
        currentCache.continuation = newItems.continuation
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
      },
    }),
    getUserBidsReceived: builder.query<any, { address: string; continuation?: string; network: Network }>({
      query: ({ address, continuation, network }) =>
        `${network}/orders/users/${address}/top-bids/v4${continuation ? `?continuation=${continuation}` : ''}`,
      serializeQueryArgs: ({ queryArgs: { address, network } }) => `bids-received-${network}-${address}`,
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems) => {
        currentCache.topBids = uniq([...currentCache.topBids, ...newItems.topBids])
        currentCache.continuation = newItems.continuation
        currentCache.totalAmount = newItems.totalAmount
        currentCache.totalTokensWithBids = newItems.totalTokensWithBids
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
      },
    }),
    getUserAsks: builder.query<any, { address: string; continuation?: string; network: Network }>({
      query: ({ address, continuation, network }) =>
        `${network}/orders/asks/v5?maker=${address}${continuation ? `&continuation=${continuation}` : ''}`,
      serializeQueryArgs: ({ queryArgs: { address, network } }) => `asks-${network}-${address}`,
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems) => {
        currentCache.orders = uniq([...currentCache.orders, ...newItems.orders])
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
export const selectUserBids = userApi.endpoints.getUserBidsMade.select
export const selectUserBidsReceived = userApi.endpoints.getUserBidsReceived.select
export const selectUserAsks = userApi.endpoints.getUserAsks.select
