import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query'

export const walletApi = createApi({
  reducerPath: 'walletApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: builder => ({
    getBalance: builder.query<{ balance: { displayValue: string } }, {}>({
      query: ({ address, network }: { address: string; network: string }) =>
        `wallet/${address}/balance?network=${network}`,
    }),
    getTokenBalance: builder.query<{ contract: string; tokenId: string; address: string; network: string }, {}>({
      query: ({
        contract,
        tokenId,
        address,
        network,
      }: {
        contract: string
        tokenId: string
        address: string
        network: string
      }) => `wallet/${address}/${contract}/${tokenId}/balance?network=${network}`,
    }),
  }),
})

export const { getTokenBalance, getBalance } = walletApi.endpoints

export const { reducer } = walletApi

export const selectTokenBalance = walletApi.endpoints.getTokenBalance.select
export const selectWalletBalance = walletApi.endpoints.getBalance.select
