import { BaseQueryFn, FetchArgs, FetchBaseQueryError, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { URLS } from '../config'
import { RootState } from './store'
import { Network } from '../types'

type URLSType = typeof URLS
type NetworkKey = keyof URLSType
type PlatformKey = keyof URLSType[NetworkKey]

export const getDynamicAPIUrl: (platform: PlatformKey) => BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> =
  platform => (args, WebApi, extraOptions) => {
    const state = WebApi.getState() as RootState
    const network = state.network.selectedNetwork as NetworkKey
    const baseUrl = URLS[network][platform]
    const rawBaseQuery = fetchBaseQuery({ baseUrl })

    return rawBaseQuery(args, WebApi, extraOptions)
  }
