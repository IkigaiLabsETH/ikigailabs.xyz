import { createAction, createAsyncThunk, createEntityAdapter, createSlice, EntityId } from '@reduxjs/toolkit'

import { RootState } from '../../../common/redux/store'
import { jsonRpcProvider, reservoirClient, walletClient } from '../../../common/web3'
import { ReservoirClient } from '@reservoir0x/reservoir-sdk'
import { Network } from '../../../common/types'
import { getUnixTime } from 'date-fns/fp'

interface TokenEntity {
  id: EntityId
  [key: string]: any
}

export const tokenAdapter = createEntityAdapter<TokenEntity>({})

export const interactionProgressAction = createAction<any>('collection/interaction/progress')
export const showListToken = createAction<any>('listToken/show')
export const showCreateBid = createAction<any>('createBid/show')

interface ProgressStep {
  message: string
  status: 'complete' | 'incomplete'
  kind: string
}

export const buyTokenTh = (client: (network: Network) => ReservoirClient, walletClient: any) =>
  createAsyncThunk<TokenEntity, { contract: string; tokenId: string; address: string; network: Network }>(
    'token/buy',
    ({ contract, tokenId, address, network }, { rejectWithValue }) => {
      return client(network)
        ?.actions.buyToken({
          items: [{ token: `${contract}:${tokenId}`, quantity: 1 }],
          wallet: walletClient(address),
          onProgress: (steps: ProgressStep[]) => {
            // dispatch(interactionProgressAction(steps))
            console.log(steps)
          },
        })
        .then((result: any) => ({ id: `${contract}:${tokenId}`, ...result }))
        .catch((err: any) => {
          return rejectWithValue(err.response?.data || err)
        })
    },
  )

export const buyToken = buyTokenTh(reservoirClient, walletClient)

export const createBidTh = (client: (network: Network) => ReservoirClient, walletClient: any) =>
  createAsyncThunk<
    TokenEntity,
    {
      contract: string
      tokenId: string
      wei: string
      address: string
      network: Network
      currency: string
      expiration: Date
      platforms: string[]
    }
  >(
    'token/makeBid',
    ({ contract, tokenId, wei, address, network, currency, expiration, platforms }, { rejectWithValue }) => {
      const bids: {
        token: string
        orderbook: 'reservoir' | 'opensea'
        orderKind: 'seaport-v1.5'
        weiPrice: string
        expirationTime: string
      }[] = [
        {
          token: `${contract}:${tokenId}`,
          orderbook: 'reservoir',
          orderKind: 'seaport-v1.5',
          weiPrice: wei,
          expirationTime: getUnixTime(expiration).toString(),
        },
      ]

      if (platforms.includes('opensea')) {
        bids.push({
          token: `${contract}:${tokenId}`,
          orderbook: 'opensea',
          orderKind: 'seaport-v1.5',
          weiPrice: wei,
          expirationTime: getUnixTime(expiration).toString(),
        })
      }

      return client(network)
        ?.actions.placeBid({
          bids: bids,
          wallet: walletClient(address),
          onProgress: (steps: ProgressStep[]) => {
            // dispatch(interactionProgressAction(steps))
            console.log(steps)
          },
        })
        .then((result: any) => ({ id: `${contract}:${tokenId}`, ...result }))
        .catch((err: any) => {
          return rejectWithValue(err.response?.data || err)
        })
    },
  )

export const createBid = createBidTh(reservoirClient, walletClient)

export const listTokenTh = (client: (network: Network) => ReservoirClient, walletClient: any) =>
  createAsyncThunk<
    TokenEntity,
    {
      contract: string
      tokenId: string
      wei: string
      address: string
      network: Network
      currency: string
      expiration: Date
      platforms: string[]
    }
  >(
    'token/list',
    ({ contract, tokenId, wei, address, network, currency, expiration, platforms }, { rejectWithValue, dispatch }) => {
      const listings: {
        token: string
        orderbook: 'reservoir' | 'opensea'
        orderKind: 'seaport-v1.5'
        weiPrice: string
        expirationTime: string
      }[] = [
        {
          token: `${contract}:${tokenId}`,
          orderbook: 'reservoir',
          orderKind: 'seaport-v1.5',
          weiPrice: wei,
          expirationTime: getUnixTime(expiration).toString(),
        },
      ]

      if (platforms.includes('opensea')) {
        listings.push({
          token: `${contract}:${tokenId}`,
          orderbook: 'opensea',
          orderKind: 'seaport-v1.5',
          weiPrice: wei,
          expirationTime: getUnixTime(expiration).toString(),
        })
      }

      return client(network)
        ?.actions.listToken({
          listings,
          wallet: walletClient(address),
          onProgress: (steps: ProgressStep[]) => {
            // dispatch(interactionProgressAction(steps))
            console.log(steps)
          },
        })
        .then((result: any) => ({ id: `${contract}:${tokenId}`, ...result }))
        .catch((err: any) => {
          return rejectWithValue(err.response?.data || err)
        })
    },
  )

export const listToken = listTokenTh(reservoirClient, walletClient)

export const acceptOfferTh = (client: (network: Network) => ReservoirClient, walletClient: any) =>
  createAsyncThunk<TokenEntity, { contract: string; tokenId: string; address: string; network: Network }>(
    'token/acceptOffer',
    ({ contract, tokenId, address, network }, { rejectWithValue, dispatch }) => {
      return client(network)
        ?.actions.buyToken({
          items: [
            {
              token: `${contract}:${tokenId}`,
              quantity: 1,
            },
          ],
          wallet: walletClient(address),
          onProgress: (steps: ProgressStep[]) => {
            // dispatch(interactionProgressAction(steps))
            console.log(steps)
          },
        })
        .then((result: any) => ({ id: `${contract}:${tokenId}`, ...result }))
        .catch((err: any) => {
          return rejectWithValue(err.response?.data || err)
        })
    },
  )

export const acceptOffer = acceptOfferTh(reservoirClient, walletClient)

export const cancelOrderTh = (client: (network: Network) => ReservoirClient, walletClient: any) =>
  createAsyncThunk<TokenEntity, { id: string; address: string; network: Network }>(
    'token/cancelOrder',
    ({ id, address, network }, { rejectWithValue, dispatch }) => {
      return client(network)
        ?.actions.cancelOrder({
          ids: [id],
          wallet: walletClient(address),
          onProgress: (steps: ProgressStep[]) => {
            // dispatch(interactionProgressAction(steps))
            console.log(steps)
          },
        })
        .then((result: any) => ({ id, ...result }))
        .catch((err: any) => {
          return rejectWithValue(err.response?.data || err)
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
      .addCase(createBid.pending, state => {
        state.status = 'pending'
      })
      .addCase(createBid.fulfilled, (state, action) => {
        const { payload } = action
        state.status = 'succeeded'
        tokenAdapter.addOne(state, payload)
      })
      .addCase(createBid.rejected, state => {
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
