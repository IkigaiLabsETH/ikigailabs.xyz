import { createAction, createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'

import { RootState } from '../../../common/redux/store'
import { reservoirClient, walletClient } from '../../../common/web3/web3'
import { ReservoirClient } from '@reservoir0x/reservoir-sdk'
import { Network } from '../../../common/types'

export const tokenAdapter = createEntityAdapter({})

export const interactionProgressAction = createAction<any>('collection/interaction/progress')

export const buyTokenTh = (client: (network: Network) => ReservoirClient, walletClient) =>
  createAsyncThunk<Promise<any>, { contract: string; tokenId: string; address: string; network: Network }>(
    'collection/token/buy',
    ({ contract, tokenId, address, network }, { rejectWithValue, dispatch }) => {
      return client(network)
        ?.actions.buyToken({
          items: [{ token: `${contract}:${tokenId}`, quantity: 1 }],
          wallet: walletClient(address, network),
          onProgress: steps => {
            dispatch(interactionProgressAction(steps))
          },
        })
        .then((res: any) => {
          return res
        })
        .catch((err: any) => {
          return rejectWithValue(err.response.data)
        })
    },
  )

export const buyToken = buyTokenTh(reservoirClient, walletClient)

export const placeBidTh = (client: (network: Network) => ReservoirClient, walletClient: any) =>
  createAsyncThunk<Promise<any>, { contract: string; tokenId: string; wei: string; address: string; network: Network }>(
    'collection/makeOffer',
    ({ contract, tokenId, wei, address, network }, { rejectWithValue, dispatch }) => {
      console.log('kjh', process.env.NEXT_PUBLIC_ALCHEMY_KEY)
      return client(network)
        ?.actions.placeBid({
          bids: [
            {
              token: `${contract}:${tokenId}`,
              weiPrice: wei,
              orderbook: 'reservoir',
              orderKind: 'seaport-v1.5',
            },
          ],
          wallet: walletClient(address, network),
          onProgress: steps => {
            console.log('steps', steps)
            dispatch(interactionProgressAction(steps))
          },
        })
        .then((res: any) => {
          return res
        })
        .catch((err: any) => {
          console.log(err.response)
          return rejectWithValue(err.response)
        })
    },
  )

export const placeBid = placeBidTh(reservoirClient, walletClient)

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
