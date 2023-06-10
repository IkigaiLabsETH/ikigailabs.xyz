import { createApi } from '@reduxjs/toolkit/query/react'
import { flip, path, uncurryN } from 'ramda'

import { getDynamicAPIUrl } from '../../../common/redux/utils';

export const collectionTokenApi = createApi({
  reducerPath: 'collectionTokenApi',
  baseQuery: getDynamicAPIUrl('reservoir'),
  endpoints: builder => ({
    getTokenByContractAndTokenId: builder.query<{ token: any }, {}>({
      query: ({ contract, tokenId }: { contract: string; tokenId: string }) =>
        `tokens/v5?tokens=${contract}:${tokenId}&includeTopBid=true&includeAttributes=true&normalizeRoyalties=true`,
      transformResponse: (response): any => path(['tokens', 0])(response),
    }),
  }),
})

export const { reducer } = collectionTokenApi

export const selector = flip(uncurryN(2, collectionTokenApi.endpoints.getTokenByContractAndTokenId.select))
