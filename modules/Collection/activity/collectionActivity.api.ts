import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { Activity } from '../../../common/types'

export const collectionActivityApi = createApi({
  reducerPath: 'collectionActivityApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.EXPLORER_URL || 'https://api-goerli.reservoir.tools' }),
  endpoints: (builder) => ({
    getCollectionActivityByContract: builder.query<{ activities: Activity[] }, string>({
      query: (contract: string) => `collections/${contract}/activity/v3?limit=20&sortBy=eventTimestamp&includeMetadata=true`,
    }),
  }),
})
