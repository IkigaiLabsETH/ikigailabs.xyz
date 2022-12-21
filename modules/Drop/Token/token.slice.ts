import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { lensPath, path, set } from 'ramda'

import { ErrorType, Status } from '../../../common/types'
import { web3, Web3 } from '../../../common/web3'

export const fetchDropNFT = createAction<{ contract: string; tokenId: string }>('drop/nft/fetch')

export const fetchDropNFTMetadataTh = (web3: Web3) =>
  createAsyncThunk<any, { contract: string; tokenId: string }, { rejectValue: string }>(
    'drop/nft/fetch',
    ({ contract, tokenId }, { rejectWithValue }) =>
      web3
        .getSignatureDrop(contract)
        .then(response => response.get(tokenId))
        .then(response => set(lensPath(['metadata', 'id'] as never), response.metadata.id.toString())(response) as any)
        .catch(error => rejectWithValue(error.message)),
  )
export const fetchDropNFTMetadata = fetchDropNFTMetadataTh(web3)

interface DropNFTState {
  entities: {
    nft: any
  }
  status: {
    nft: Status
  }
  error: {
    nft: ErrorType
  }
}

const initialState = {
  entities: {
    nft: {},
  },
  status: {
    nft: 'idle',
  },
  error: {
    nft: null,
  },
} as DropNFTState

// Then, handle actions in your reducers:
export const dropNFTSlice = createSlice({
  name: 'drop',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: builder => {
    builder
      .addCase(fetchDropNFTMetadata.pending, (state, action) => {
        state.status.nft = 'loading'
      })
      .addCase(fetchDropNFTMetadata.fulfilled, (state, action) => {
        const { payload } = action
        state.status.nft = 'succeeded'
        // @ts-ignore
        state.entities.nft = payload
        state.error.nft = null
      })
      .addCase(fetchDropNFTMetadata.rejected, (state, action) => {
        const { payload } = action
        state.status.nft = 'failed'
        if (payload) {
          state.error.nft = action.payload
        } else {
          state.error.nft = action.error.message
        }
      })
  },
})

export const { reducer } = dropNFTSlice

export const selectNft = path(['signatureNFT', 'entities', 'nft'])
export const selectNftLoadingState = path(['signatureNFT', 'status', 'nft'])
