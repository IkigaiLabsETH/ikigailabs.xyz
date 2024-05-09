import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ContractType, Network } from '../../common/types'

export const editionDropApi = createApi({
  reducerPath: 'editionDrop',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: builder => ({
    getToken: builder.query<{ token: any }, {}>({
      query: ({ contract, tokenId }: { contract: string; tokenId: string }) =>
        `drop/${contract}/token/${tokenId}?network={network}`,
    }),
    getTokenMetadata: builder.query<{ token: any }, {}>({
      query: ({ contract, tokenId }: { contract: string; tokenId: string }) =>
        `drop/${contract}/token/${tokenId}/metadata?network={network}`,
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

export const { getToken, getTokenMetadata, getDropTokenByContractAndTokenId } = editionDropApi.endpoints
export const selectToken = editionDropApi.endpoints.getDropTokenByContractAndTokenId.select
