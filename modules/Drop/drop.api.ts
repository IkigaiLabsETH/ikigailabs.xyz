import { createAction } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { Network, ContractType, Drop } from '../../common/types'

export const fetchdrop = createAction<{ contract: string }>('drop/fetch')

export const dropApi = createApi({
  reducerPath: 'dropApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Drop', 'Claim'],
  endpoints: builder => ({
    getDropMetadataByContract: builder.query<Drop, {}>({
      query: ({ contract, network, type = 'nft-drop' }: { contract: string; network: Network; type: ContractType }) =>
        `drop/${contract}/metadata?network=${network}${type ? `&type=${type}` : ''}`,
    }),
    getDropByContract: builder.query<Drop, {}>({
      query: ({ contract, network, type = 'nft-drop' }: { contract: string; network: Network; type: ContractType }) =>
        `drop/${contract}?network=${network}${type ? `&type=${type}` : ''}`,
    }),
    getDropTokenByContractAndTokenId: builder.query<any, {}>({
      query: ({
        contract,
        tokenId,
        network,
        type = 'nft-drop',
      }: {
        contract: string
        tokenId: string
        network: Network
        type: ContractType
      }) => `drop/${contract}/${tokenId}?network=${network}${type ? `&type=${type}` : ''}`,
    }),
  }),
})

export const { getDropByContract, getDropMetadataByContract, getDropTokenByContractAndTokenId } = dropApi.endpoints

export const selectDropMetadata = dropApi.endpoints.getDropMetadataByContract.select
export const selectDrop = dropApi.endpoints.getDropByContract.select
export const selectToken = dropApi.endpoints.getDropTokenByContractAndTokenId.select
