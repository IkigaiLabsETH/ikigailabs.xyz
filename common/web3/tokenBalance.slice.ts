import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { BigNumber } from 'ethers'
import { append, both, find, pipe, propEq, propOr, reject } from 'ramda'

import { web3, Web3 } from '.'
import { RootState } from '../redux/store'

const _getTokenBalance = (web3: Web3) =>
  createAsyncThunk<Promise<any>, { contract: string; tokenId: string; address: string }, { rejectValue: string }>(
    'Contract/TokenBalance/Get',
    async ({ contract, tokenId, address }, { rejectWithValue }) =>
      web3
        .getContract(contract)
        .then(contract => contract.call('balanceOf', address, tokenId))
        .then((balance: BigNumber) => balance.toNumber())
        .catch(error => rejectWithValue(error.message)),
  )

export const getTokenBalance = _getTokenBalance(web3)

interface ContractState {
  entities: {}
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null | undefined
}

const initialState = {
  entities: {},
  status: 'idle',
  error: null,
} as ContractState

// Then, handle actions in your reducers:
export const tokenBalanceSlice = createSlice({
  name: 'tokenBalance',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getTokenBalance.pending, state => {
        state.status = 'loading'
      })
      .addCase(getTokenBalance.fulfilled, (state, action) => {
        const {
          payload,
          meta: {
            arg: { contract, address, tokenId },
          },
        } = action
        // @ts-ignore
        state.entities[address] = pipe(
          propOr([], address),
          // @ts-ignore
          reject(both(propEq('contract', contract), propEq('tokenId', tokenId))),
          append({ contract, tokenId, balance: payload }),
        )(state.entities)
        state.status = 'succeeded'
      })
      .addCase(getTokenBalance.rejected, (state, action) => {
        const { payload } = action
        state.status = 'failed'
        if (payload) {
          state.error = payload
        } else {
          state.error = action.error.message
        }
      })
  },
})

export const { reducer } = tokenBalanceSlice

// Other code such as selectors can use the imported `RootState` type
export const selectContracts = (state: RootState) => state.tokenBalance
export const selectTokensWithBalancesForAddress = (address: string) => (state: RootState) =>
  pipe(propOr([], address) /* filter(has('balance')) */)(state.tokenBalance.entities) as unknown as any[]
export const selectContractCallStatus = (state: RootState) => state.tokenBalance.status
export const selectTokenBalanceForAddress =
  ({ tokenContract, address }: { tokenContract: string; address: string }) =>
  (state: RootState) =>
    pipe(propOr([], address), find(propEq('contract', tokenContract)))(state.tokenBalance.entities)
