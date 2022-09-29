import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { ContractMetadata, ErrorType, Status } from '../../common/types'
import { RootState } from '../../common/redux/store'
import { web3, Web3 } from '../../common/web3'

export const fetchFeaturedDropTh = (web3: Web3) =>
  createAsyncThunk<Promise<ContractMetadata | unknown>, { contract: string }>(
    'featuredDrop/fetch',
    ({ contract }, { rejectWithValue }) =>
      web3
        .getNFTDrop(contract)
        .then(response => response.metadata.get())
        .then((response: ContractMetadata) => response)
        .catch((error: Error) => rejectWithValue(error.message)),
  )

export const fetchFeaturedDrop = fetchFeaturedDropTh(web3)

interface featuredDropState {
  entities: ContractMetadata
  status: Status
  error: ErrorType
}

const initialState = {
  entities: {},
  status: 'idle',
  error: null,
} as featuredDropState

// Then, handle actions in your reducers:
export const featuredDropSlice = createSlice({
  name: 'featuredDrop',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: builder => {
    builder
      .addCase(fetchFeaturedDrop.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchFeaturedDrop.fulfilled, (state, action) => {
        const { payload } = action
        state.status = 'succeeded'
        // @ts-ignore
        state.entities = payload
      })
      .addCase(fetchFeaturedDrop.rejected, (state, action) => {
        const { payload } = action
        state.status = 'failed'
        if (payload) {
          // @ts-ignore
          state.error = action.payload
        } else {
          state.error = action.error.message
        }
      })
  },
})

export const { reducer } = featuredDropSlice

// Other code such as selectors can use the imported `RootState` type
export const selectfeaturedDrop = (state: RootState) => state.featuredDrop.entities
export const selectLoadingState = (state: RootState) => state.featuredDrop.status
