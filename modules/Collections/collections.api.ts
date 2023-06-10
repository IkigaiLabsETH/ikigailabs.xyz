import { createAction } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { path, prop } from 'ramda'
import { HYDRATE } from 'next-redux-wrapper'

import { http } from '../../common/http'
import { HTTP } from '../../common/types'
import { getDynamicAPIUrl } from '../../common/redux/utils'

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
  baseQuery: getDynamicAPIUrl('reservoir'),
  endpoints: builder => ({
    getCollectionsBySetId: builder.query({
      query: (setId: string) => ({
        url: `collections/v5?collectionsSetId=${setId}`,
      }),
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
