import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { lensPath, path, set } from 'ramda'

import { ErrorType, NFTMetadataOwner, Status } from '../../../common/types'
import { web3, Web3 } from '../../../common/web3'

export const fetchSignatureDropNFT = createAction<{ contract: string; tokenId: string }>('signatureDrop/nft/fetch')

export const fetchSignatureDropNFTMetadataTh = (web3: Web3) =>
  createAsyncThunk<NFTMetadataOwner, { contract: string; tokenId: string }, { rejectValue: string }>(
    'signatureDrop/nft/fetch',
    ({ contract, tokenId }, { rejectWithValue }) =>
      web3
        .getSignatureDrop(contract)
        .then(response => response.get(tokenId))
        .then(
          response =>
            set(lensPath(['metadata', 'id'] as never), response.metadata.id.toString())(response) as NFTMetadataOwner,
        )
        .catch(error => rejectWithValue(error.message)),
  )
export const fetchSignatureDropNFTMetadata = fetchSignatureDropNFTMetadataTh(web3)

interface SignatureDropNFTState {
  entities: {
    nft: NFTMetadataOwner
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
} as SignatureDropNFTState

// Then, handle actions in your reducers:
export const signatureDropNFTSlice = createSlice({
  name: 'signatureDrop',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: builder => {
    builder
      .addCase(fetchSignatureDropNFTMetadata.pending, (state, action) => {
        state.status.nft = 'loading'
      })
      .addCase(fetchSignatureDropNFTMetadata.fulfilled, (state, action) => {
        const { payload } = action
        state.status.nft = 'succeeded'
        // @ts-ignore
        state.entities.nft = payload
        state.error.nft = null
      })
      .addCase(fetchSignatureDropNFTMetadata.rejected, (state, action) => {
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

export const { reducer } = signatureDropNFTSlice

export const selectNft = path(['signatureNFT', 'entities', 'nft'])
export const selectNftLoadingState = path(['signatureNFT', 'status', 'nft'])
