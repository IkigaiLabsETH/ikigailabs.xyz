import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { map, mergeAll } from 'ramda'
import { RootState } from '../../common/redux/store'

import { ErrorType, Status } from '../../common/types'
import { Web3 } from '../../common/web3'

export const fetchNFTDrops = createAsyncThunk<Promise<{} | Error>, { web3: Web3; contracts: string[] }>(
  'NFTDrops/fetch',
  ({ web3, contracts }, { rejectWithValue }) =>
    Promise.all(
      map(async (contract: string) => {
        const drop = web3.getNFTDrop(contract)

        // return Promise.all([drop.metadata.get(), drop.getAll()])
        //   .then(([metadata, nfts]) => ({ [contract]: { metadata, nfts: map(formatNFTMetadata)(nfts) } }))
        //   .catch(error => rejectWithValue(error.message))
      })(contracts),
    ),
)

interface NFTDropsState {
  entities: any
  status: Status
  error: ErrorType
}

const initialState = {
  entities: {},
  status: 'idle',
  error: null,
} as NFTDropsState

// Then, handle actions in your reducers:
export const NFTDropsSlice = createSlice({
  name: 'NFTDrops',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: builder => {
    builder
      .addCase(fetchNFTDrops.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchNFTDrops.fulfilled, (state, action) => {
        const { payload } = action
        state.status = 'succeeded'
        // @ts-ignore
        state.entities = mergeAll(payload)
      })
      .addCase(fetchNFTDrops.rejected, (state, action) => {
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

export const { reducer } = NFTDropsSlice

export const selectNFTDrop = (contract: string) => (state: RootState) => state.NFTDrops.entities[contract] || {}
export const selectLoadingState = (state: RootState) => state.NFTDrops.status
