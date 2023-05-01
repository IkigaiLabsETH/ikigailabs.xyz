import { createAction, createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'

import { RootState } from '../../../common/redux/store'
import { client, signer } from '../../../common/web3/web3'

export const tokenAdapter = createEntityAdapter({})

export const interactionProgressAction = createAction('collection/interaction/progress')

export const buyTokenTh = (client: any, signer: any) =>
  createAsyncThunk<Promise<any>, { contract: string; tokenId: string }>(
    'collection/token/buy',
    ({ contract, tokenId }, { rejectWithValue, dispatch }) => {
      return client?.actions
        .buyToken({
          items: [{ token: `${contract}:${tokenId}`, quantity: 1 }],
          signer,
          onProgress: steps => {
            dispatch(interactionProgressAction(steps))
          },
        })
        .then((res: any) => {
          console.log(res)
          return res
        })
        .catch((err: any) => {
          return rejectWithValue(err.response.data)
        })
    },
  )

export const buyToken = buyTokenTh(client, signer)

export const placeBidTh = (client: any, signer: any) =>
  createAsyncThunk<Promise<any>, { contract: string; tokenId: string; wei: string }>(
    'collection/makeOffer',
    ({ contract, tokenId, wei }, { rejectWithValue, dispatch }) => {
      return client?.actions
        .placeBid({
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
            dispatch(interactionProgressAction(steps))
          },
        })
        .then((res: any) => {
          console.log(res)
          return res
        })
        .catch((err: any) => {
          return rejectWithValue(err.response.data)
        })
    },
  )

export const placeBid = placeBidTh(client, signer)

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
      })
  },
})

export const collectionTokenInteractionReducer = tokenSlice.reducer
export const selectCollectionTokenInteractionStatus = (state: RootState) => state.collectionTokenInteraction
