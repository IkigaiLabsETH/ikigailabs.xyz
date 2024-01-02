import { createAction, createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'

import { RootState } from '../../../common/redux/store'
import { reservoirClient, walletClient } from '../../../common/web3/web3'
import { ReservoirClient } from '@reservoir0x/reservoir-sdk'
import { Network } from '../../../common/types'

export const tokenAdapter = createEntityAdapter({})

export const interactionProgressAction = createAction<any>('collection/interaction/progress')
export const showListToken = createAction<any>('listToken/show')

export const buyTokenTh = (client: (network: Network) => ReservoirClient, walletClient: any) =>
  createAsyncThunk<Promise<any>, { contract: string; tokenId: string; address: string; network: Network }>(
    'token/buy',
    ({ contract, tokenId, address, network }, { rejectWithValue, dispatch }) => {
      return client(network)
        ?.actions.buyToken({
          items: [{ token: `${contract}:${tokenId}`, quantity: 1 }],
          wallet: walletClient(address, network),
          onProgress: steps => {
            // dispatch(interactionProgressAction(steps))
            console.log(steps)
          },
        })
        .catch((err: any) => {
          return rejectWithValue(err.response.data)
        })
    },
  )

export const buyToken = buyTokenTh(reservoirClient, walletClient)

export const placeBidTh = (client: (network: Network) => ReservoirClient, walletClient: any) =>
  createAsyncThunk<Promise<any>, { contract: string; tokenId: string; wei: string; address: string; network: Network }>(
    'token/makeBid',
    ({ contract, tokenId, wei, address, network }, { rejectWithValue }) => {
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
            // dispatch(interactionProgressAction(steps))
            console.log(steps)
          },
        })
        .catch((err: any) => {
          return rejectWithValue(err)
        })
    },
  )

export const placeBid = placeBidTh(reservoirClient, walletClient)

export const listTokenTh = (client: (network: Network) => ReservoirClient, walletClient: any) =>
  createAsyncThunk<Promise<any>, { contract: string; tokenId: string; wei: string; address: string; network: Network }>(
    'token/list',
    ({ contract, tokenId, wei, address, network }, { rejectWithValue, dispatch }) => {
      console.log(network)
      return client(network)
        ?.actions.listToken({
          listings: [
            {
              token: `${contract}:${tokenId}`,
              orderbook: 'reservoir',
              orderKind: 'seaport-v1.5',
              weiPrice: wei,
            },
          ],
          wallet: walletClient(address, network),
          onProgress: steps => {
            // dispatch(interactionProgressAction(steps))
            console.log(steps)
          },
        })
        .catch((err: any) => {
          return rejectWithValue(err)
        })
    },
  )

export const listToken = listTokenTh(reservoirClient, walletClient)

export const acceptOfferTh = (client: (network: Network) => ReservoirClient, walletClient: any) =>
  createAsyncThunk<Promise<any>, { contract: string; tokenId: string; address: string; network: Network }>(
    'token/acceptOffer',
    ({ contract, tokenId, address, network }, { rejectWithValue, dispatch }) => {
      return client(network)
        ?.actions.acceptOffer({
          items: [
            {
              token: `${contract}:${tokenId}`,
              quantity: 1,
            },
          ],
          wallet: walletClient(address, network),
          onProgress: steps => {
            // dispatch(interactionProgressAction(steps))
            console.log(steps)
          },
        })
        .catch((err: any) => {
          return rejectWithValue(err)
        })
    },
  )

export const acceptOffer = acceptOfferTh(reservoirClient, walletClient)

export const cancelOrderTh = (client: (network: Network) => ReservoirClient, walletClient: any) =>
  createAsyncThunk<Promise<any>, { id: string; address: string; network: Network }>(
    'token/cancelOrder',
    ({ id, address, network }, { rejectWithValue, dispatch }) => {
      return client(network)
        ?.actions.cancelOrder({
          ids: [id],
          wallet: walletClient(address, network),
          onProgress: steps => {
            // dispatch(interactionProgressAction(steps))
            console.log(steps)
          },
        })
        .catch((err: any) => {
          return rejectWithValue(err)
        })
    },
  )

export const cancelOrder = cancelOrderTh(reservoirClient, walletClient)

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
      .addCase(placeBid.rejected, state => {
        state.status = 'failed'
      })
      .addCase(listToken.pending, state => {
        state.status = 'pending'
      })
      .addCase(listToken.fulfilled, (state, action) => {
        const { payload } = action
        state.status = 'succeeded'
        tokenAdapter.addOne(state, payload)
      })
      .addCase(listToken.rejected, state => {
        state.status = 'failed'
      })
      .addCase(acceptOffer.pending, state => {
        state.status = 'pending'
      })
      .addCase(acceptOffer.fulfilled, (state, action) => {
        const { payload } = action
        state.status = 'succeeded'
        tokenAdapter.addOne(state, payload)
      })
      .addCase(acceptOffer.rejected, state => {
        state.status = 'failed'
      })
      .addCase(cancelOrder.pending, state => {
        state.status = 'pending'
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        const { payload } = action
        state.status = 'succeeded'
        tokenAdapter.addOne(state, payload)
      })
      .addCase(cancelOrder.rejected, state => {
        state.status = 'failed'
      })
  },
})

export const collectionTokenInteractionReducer = tokenSlice.reducer
export const selectCollectionTokenInteractionStatus = (state: RootState) => state.collectionTokenInteraction
