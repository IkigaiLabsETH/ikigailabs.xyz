import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query'
import { Collection, SearchResult } from '../../common/types'

export const searchApi = createApi({
  reducerPath: 'searchApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'api/reservoir' }),
  endpoints: builder => ({
    search: builder.query<{ collections: SearchResult[] }, { query: string }>({
      query: ({ query }) => `https://api.reservoir.tools/collections/search/v1?${query}&excludeSpam=true&limit=5`,
    }),
  }),
})

export const { search } = searchApi.endpoints
export const { reducer } = searchApi

export const selectSearchResults = searchApi.endpoints.search.select
