import { BaseQueryFn, FetchArgs, FetchBaseQueryError, fetchBaseQuery } from '@reduxjs/toolkit/dist/query'
import { URLS } from '../config'
import { RootState } from './store'

export const getDynamicAPIUrl: (platform: string) => BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> =
  platform => (args, WebApi, extraOptions) => {
    const baseUrl = URLS[(WebApi.getState() as RootState).network.selectedNetwork][platform]
    const rawBaseQuery = fetchBaseQuery({ baseUrl })

    return rawBaseQuery(args, WebApi, extraOptions)
  }
