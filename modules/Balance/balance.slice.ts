import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import promiseRetry from 'promise-retry'
import { lensProp, set } from 'ramda'

import { RootState } from '../../common/redux/store'
import { Token } from '../../common/types'
import { web3, Web3 } from '../../common/web3'

export const fetchBalance = (web3: Web3) =>
  createAsyncThunk<Promise<Partial<Token>>, { address: string }, { rejectValue: string }>(
    'balance/fetch',
    ({ address }, { rejectWithValue }) =>
      promiseRetry(retry => web3.getBalance(address).catch(retry))
        .then(response => set(lensProp('value' as never), response.value.toString())(response))
        .catch((error: Error) => rejectWithValue(error.message)),
  )

export const fetchEthBalance = fetchBalance(web3)

interface BalanceState {
  entities: Partial<Token>
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null | undefined
}

const initialState = {
  entities: {},
  status: 'idle',
  error: null,
} as BalanceState

// Then, handle actions in your reducers:
export const balanceSlice = createSlice({
  name: 'balance',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: builder => {
    builder
      .addCase(fetchEthBalance.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchEthBalance.fulfilled, (state, action) => {
        const { payload } = action
        state.status = 'succeeded'
        // @ts-ignore
        state.entities = payload
      })
      .addCase(fetchEthBalance.rejected, (state, action) => {
        const { payload } = action
        state.status = 'failed'
        if (payload) {
          state.error = action.payload
        } else {
          state.error = action.error.message
        }
      })
  },
})

export const { reducer } = balanceSlice

// Other code such as selectors can use the imported `RootState` type
export const selectBalance = (state: RootState) => state.balance.entities.displayValue
export const selectLoadingState = (state: RootState) => state.balance.status
