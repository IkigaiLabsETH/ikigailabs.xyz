import { createAction } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { map, mergeAll, objOf, path, pipe, prop, uniqBy } from 'ramda'
import { HYDRATE } from 'next-redux-wrapper'

import { http } from '../../common/http'
import { HTTP, Network } from '../../common/types'
import { RootState } from '../../common/redux'

export const loadCollections = createAction('collections/loadCollections')

export const collectionsSetApi = createApi({
  reducerPath: 'collectionsSetApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_AIRTABLE_URL || 'https://api.airtable.com' }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  endpoints: builder => ({
    getCollectionsSetId: builder.query({
      query: () => ({
        url: `/v0/${process.env.NEXT_AIRTABLE_BASE_ID || 'app1IHvYXPgyenQuv'}/Configuration?maxRecords=3`,
        headers: {
          Authorization: `Bearer ${process.env.NEXT_AIRTABLE_API_KEY || 'keyQWirC3t48lEo7b'}`,
        },
      }),
      transformResponse: (response: any): string => prop('id', response.records[0].fields.Value),
    }),
  }),
})

export const collectionsApi = createApi({
  reducerPath: 'collectionsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: builder => ({
    getSupportedNetworks: builder.query<any, void>({
      query: () => '/networks',
      transformResponse: (response: any) =>
        pipe(
          prop('tables'),
          map((table: any) => objOf(prop('name')(table))(prop('id')(table))),
          mergeAll,
        )(response),
    }),
    getCollectionSets: builder.query<any, { tableId: string }>({
      query: ({ tableId }) => `/collection-sets/${tableId}`,
    }),
    getCollectionsByCommunity: builder.query<any, { continuation?: string; community: 'artblocks' }>({
      query: ({ continuation, community }) =>
        `reservoir/ethereum/collections/v7?community=${community}${
          continuation ? `&continuation=${continuation}` : ''
        }`,
      serializeQueryArgs: ({ queryArgs: { community } }) => community,
      merge: (currentCache, newItems) => {
        currentCache.collections = uniqBy(prop('id'), [...currentCache.collections, ...newItems.collections])
        currentCache.continuation = newItems.continuation
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
      },
    }),
    getCollectionsBySetId: builder.query<
      any,
      { collectionSetId: string; continuation?: string; network: Network; limit?: number }
    >({
      query: ({ collectionSetId, continuation, network, limit = 20 }) =>
        `reservoir/${network}/collections/v7?limit=${limit}&collectionsSetId=${collectionSetId}${
          continuation ? `&continuation=${continuation}` : ''
        }`,
      serializeQueryArgs: ({ queryArgs: { collectionSetId } }) => collectionSetId,
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems) => {
        currentCache.collections = uniqBy(prop('id'), [...currentCache.collections, ...newItems.collections])
        currentCache.continuation = newItems.continuation
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
      },
    }),
    getCollectionFloorsByCollectionSetId: builder.query<any, { collectionSetId: string }>({
      query: ({ collectionSetId }) => `collection-sets/floors/${collectionSetId}`,
    }),
  }),
})

export const _getCollectionsSetId = (http: HTTP) => () =>
  http
    .get(`https://api.airtable.com/v0/app1IHvYXPgyenQuv/Configuration?maxRecords=3`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_AIRTABLE_API_KEY || 'keyQWirC3t48lEo7b'}`,
      },
    })
    .then(path(['data', 'records', 0, 'fields', 'Value']))
    .catch(console.error)

export const getCollectionsSetId = _getCollectionsSetId(http)

export const selectCollectionsBySetId = collectionsApi.endpoints.getCollectionsBySetId.select
export const selectCollectionsByCommunity = collectionsApi.endpoints.getCollectionsByCommunity.select
export const selectSupportedNetworks = collectionsApi.endpoints.getSupportedNetworks.select
export const selectCollectionSets = collectionsApi.endpoints.getCollectionSets.select
export const selectCollectionFloorsByCollectionSetId =
  collectionsApi.endpoints.getCollectionFloorsByCollectionSetId.select
export const selectSupportedNetworkTableIdByNetwork = (network: Network) => (state: RootState) => {
  return selectSupportedNetworks()(state)?.data?.[network]
}
