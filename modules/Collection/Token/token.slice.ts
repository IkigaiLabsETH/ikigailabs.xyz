import { createAction, createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { getClient } from '@reservoir0x/reservoir-sdk'
import { ethers } from 'ethers'

import { createClient } from '@reservoir0x/reservoir-sdk'
import { RootState } from '../../../common/redux/store'

export const tokenAdapter = createEntityAdapter({})

export const buyTokenTh = (client: any, signer: any) =>
  createAsyncThunk<Promise<any>, { contract: string; tokenId: string }>(
    'collection/token/buy',
    ({ contract, tokenId }, { rejectWithValue }) => {
      return client()
        ?.actions.buyToken({
          items: [{ token: `${contract}:${tokenId}`, quantity: 1 }],
          signer,
          onProgress: steps => {
            console.log(steps)
          },
        })
        .then((res: any) => {
          console.log(res)
          return res
        })
        .catch((err: any) => {
          console.log(err)
          return rejectWithValue(err.message)
        })
    },
  )

export const buyToken = buyTokenTh(getClient, signer)

export const placeBidTh = (client: any, signer: any) =>
  createAsyncThunk<Promise<any>, { contract: string; tokenId: string; wei: string }>(
    'collection/makeOffer',
    ({ contract, tokenId, wei }, { rejectWithValue }) => {
      return client()
        ?.actions.placeBid({
          bids: [
            {
              token: `${contract}:${tokenId}`,
              weiPrice: wei,
              orderbook: 'reservoir',
              orderKind: 'seaport-v1.4',
            },
          ],
          signer,
          onProgress: steps => {
            console.log(steps)
          },
        })
        .then((res: any) => {
          console.log(res)
          return res
        })
        .catch((err: any) => {
          console.log(err)
          return rejectWithValue(err)
        })
    },
  )

export const placeBid = placeBidTh(getClient, signer)

export const tokenSlice = createSlice({
  name: 'collectionTokenInteraction',
  initialState: tokenAdapter.getInitialState({
    status: 'idle',
  }),
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(buyToken.pending, state => {
        state.status = 'pending'
      })
      .addCase(buyToken.fulfilled, (state, action) => {
        const { payload } = action
        state.status = 'succeeded'
        tokenAdapter.addOne(state, payload)
      })
      .addCase(buyToken.rejected, state => {
        state.status = 'failed'
      })
      .addCase(placeBid.pending, state => {
        state.status = 'pending'
      })
      .addCase(placeBid.fulfilled, (state, action) => {
        const { payload } = action
        state.status = 'succeeded'
        tokenAdapter.addOne(state, payload)
      })
      .addCase(placeBid.rejected, (state, action) => {
        state.status = 'failed'
        console.log(action)
        tokenAdapter.upsertOne(state, { id: '1', name: action.payload })
      })
  },
})

export const collectionTokenInteractionReducer = tokenSlice.reducer
export const selectCollectionTokenInteractionStatus = (state: RootState) => state.collectionTokenInteraction
