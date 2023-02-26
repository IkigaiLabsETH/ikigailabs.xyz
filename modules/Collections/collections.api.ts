import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { prop } from 'ramda'

export const collectionsApi = createApi({
  reducerPath: 'collectionsApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_AIRTABLE_URL || 'https://api.airtable.com' }),
  endpoints: builder => ({
    getCollectionsSetId: builder.query({
      query: () => ({
        url: `/v0/${process.env.NEXT_AIRTABLE_BASE_ID || 'app1IHvYXPgyenQuv'}/Configuration?maxRecords=3`,
        headers: {
          Authorization: `Bearer ${process.env.NEXT_AIRTABLE_API_KEY || 'keyQWirC3t48lEo7b'}`,
        },
      }),
      transformResponse: (response: any): string => {
        console.log('response', response)
        return prop('id', response.records[0].fields.Value)
      }
    }),
  }),
})
