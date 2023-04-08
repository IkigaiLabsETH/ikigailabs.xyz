import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { assoc, lensPath, path, pipe, prop, set } from 'ramda'
import { RootState } from '../../../common/redux/store'

import { web3, Web3 } from '../../../common/web3'
import { tokensAdapter } from '../drop.slice'

export const dropTokenAdapter = createEntityAdapter({})

export const fetchDropTokenMetadataTh = (web3: Web3) =>
  createAsyncThunk<any, { contract: string; tokenId: string }, { rejectValue: string }>(
    'drop/token/fetch',
    ({ contract, tokenId }, { rejectWithValue }) =>
      web3
        .getContract(contract, 'nft-drop')
        .then(response => response.get(tokenId))
        .then(response => 
          pipe(
            set(lensPath(['metadata', 'id'] as never), response.metadata.id.toString()),
            assoc('id', `${contract}/${response.metadata.id}`),
          )(response) as any
        )
        .catch(error => rejectWithValue(error.message))
  )
export const fetchDropTokenMetadata = fetchDropTokenMetadataTh(web3)

// Then, handle actions in your reducers:
export const DropTokenSlice = createSlice({
  name: 'dropToken',
  initialState: dropTokenAdapter.getInitialState({
    status: 'idle',
  }),
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: builder => {
    builder
      .addCase(fetchDropTokenMetadata.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchDropTokenMetadata.fulfilled, (state, action) => {
        const { payload } = action
        state.status = 'succeeded'
        // @ts-ignore
        dropTokenAdapter.upsertOne(state, payload)
      })
      .addCase(fetchDropTokenMetadata.rejected, (state, action) => {
        state.status = 'failed'
      })
  },
})

export const { reducer } = DropTokenSlice

export const dropTokenSelectors = tokensAdapter.getSelectors(prop('dropToken'))
export const selectDropTokenById = (contract: string, tokenId: string) => (state: RootState) => dropTokenSelectors.selectById(state, `${contract}/${tokenId}`)
export const selectDropTokenStatus = (state: RootState) => state.dropToken.status
