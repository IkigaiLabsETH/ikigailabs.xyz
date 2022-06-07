import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { omit } from 'ramda'
import { RootState } from '../../common/redux/store'

import { Token } from '../../common/types'

// First, create the thunk
export const fetchBalance = createAsyncThunk<Partial<Token>, any, { rejectValue: string }>(
    'balance/fetch',
    ({ getBalance, contract }: { getBalance: (contract?: string) => Promise<Token>, contract: string }, { rejectWithValue }) =>
      getBalance()
        .then(response => omit(['value'])(response))
        .catch((error: Error) => rejectWithValue(error.message)),
  )

interface BalanceState {
  entities: Partial<Token>
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: string | null | undefined
}

const initialState = {
  entities: {},
  loading: 'idle',
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
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchBalance.fulfilled, (state, action) => {
      const { payload } = action
      state.entities = payload
    })

    builder.addCase(fetchBalance.rejected, (state, action) => {
      const { payload } = action
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
export const selectBalanceState = (state: RootState) => state.balance.loading

