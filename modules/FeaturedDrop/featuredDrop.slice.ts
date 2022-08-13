import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { ContractMetadata, ErrorType, NFTDrop, Status } from '../../common/types'
import { RootState } from '../../common/redux/store'

export const fetchFeaturedDrop = createAsyncThunk<
  Promise<ContractMetadata | unknown>,
  { getNFTDrop: (contract: string) => NFTDrop; contract: string }
>('featuredDrop/fetch', ({ getNFTDrop, contract }, { rejectWithValue }) =>
  getNFTDrop(contract)
    .metadata.get()
    .then((response: ContractMetadata) => response)
    .catch((error: Error) => rejectWithValue(error.message)),
)

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
