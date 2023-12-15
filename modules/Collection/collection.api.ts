import { createAction } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { path, uniqBy } from 'ramda'

import { Activity, Collection, NFT, Network } from '../../common/types'

export const fetchCollection = createAction<{ contract: string; network: string }>('collection/fetch')

export const collectionApi = createApi({
  reducerPath: 'collectionApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/reservoir' }),
  endpoints: builder => ({
    getCollectionByContract: builder.query<Collection, { contract: string; network: Network }>({
      query: ({ contract, network }) =>
        `${network}/collections/v5?id=${contract}&includeTopBid=true&sortBy=allTimeVolume&includeAttributes=false&limit=20`,
      transformResponse: (response): any => path(['collections', 0])(response),
    }),
    getCollectionActivityByContract: builder.query<{ activities: Activity[] }, { contract: string; network: Network }>({
      query: ({ contract, network }) =>
        `${network}/collections/${contract}/activity/v3?limit=20&sortBy=eventTimestamp&includeMetadata=true`,
    }),
    getCollectionAttributesByContract: builder.query<{ attributes: any }, { contract: string; network: Network }>({
      query: ({ contract, network }) => `${network}/collections/${contract}/attributes/all/v2`,
    }),
    getCollectionTokensByContractWithAttributes: builder.query<
      { tokens: NFT[]; continuation: string; attributes: string },
      { contract: string; attributes: string; continuation: string; network: Network; sortBy: string }
    >({
      query: ({ contract, attributes, continuation, network, sortBy = 'floorAskPrice-asc' }) => {
        const [sort, order] = sortBy.split('-')
        return `${network}/tokens/v6?collection=${contract}&includeOwnerCount=true&includeTopBid=true&sortBy=${sort}&sortDirection=${order}&includeQuantity=true&includeLastSale=true${
          continuation ? `&continuation=${continuation}` : ''
        }${attributes && attributes}&limit=20`
      },
      serializeQueryArgs: ({ endpointName, queryArgs: { attributes, sortBy } }) => {
        return `${endpointName}-${sortBy}-${attributes}`
      },
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems) => {
        currentCache.tokens = uniqBy(path(['token', 'tokenId']), [...currentCache.tokens, ...newItems.tokens])
        currentCache.continuation = newItems.continuation
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
      },
    }),
  }),
})

export const { getCollectionByContract, getCollectionAttributesByContract, getCollectionActivityByContract } =
  collectionApi.endpoints
