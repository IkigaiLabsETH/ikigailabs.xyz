import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { Activity, Facet, NFT } from '../../common/types'
import { formatAttributes } from '../../common/utils/utils'

export const collectionApi = createApi({
  reducerPath: 'collectionApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.EXPLORER_URL || 'https://api-goerli.reservoir.tools' }),
  endpoints: builder => ({
    getCollectionByContract: builder.query<{ collection: any }, string>({
      query: (contract: string) =>
        `collections/v5?id=${contract}&includeTopBid=true&sortBy=allTimeVolume&includeAttributes=false&limit=20`,
    }),
    getCollectionActivityByContract: builder.query<{ activities: Activity[] }, string>({
      query: (contract: string) =>
        `collections/${contract}/activity/v3?limit=20&sortBy=eventTimestamp&includeMetadata=true`,
    }),
    getCollectionAttributesByContract: builder.query<{ attributes: any }, string>({
      query: (contract: string) => `collections/${contract}/attributes/all/v2`,
    }),
    getCollectionTokensByContractWithAttributes: builder.query<
      { tokens: NFT[] },
      { contract: string; attributes: string }
    >({
      query: ({ contract, attributes }) =>
        `tokens/v5?collection=${contract}&includeOwnerCount=true&includeTopBid=true&sortBy=floorAskPrice${
          attributes && attributes
        }&limit=20`,
    }),
  }),
})

export const { useGetCollectionTokensByContractWithAttributesQuery } = collectionApi
