import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../common/redux/store'
import promiseRetry from 'promise-retry'

import { ErrorType, Network, Status } from '../../common/types'
import { find, findIndex, isNil, path, pipe, propEq } from 'ramda'
import { getTWClient, Web3 } from '../../common/web3'

export const showMintPassDetails = createAction<any>('MintPassess/show')

export const claimTh = (web3Client: (network: Network) => Web3) =>
  createAsyncThunk<
    Promise<{} | Error>,
    { contract: string; address: string; tokenId: number; amount: number; network: Network }
  >('MintPasses/claim', ({ contract, address, tokenId, amount, network }, { rejectWithValue }) => {
    const web3 = web3Client(network)
    return promiseRetry(retry =>
      web3
        .getContract(contract, 'edition-drop')
        .then(response => response.claimTo(address, tokenId, amount))
        .catch(retry),
    ).catch(error => rejectWithValue(error.message))
  })

export const claim = claimTh(getTWClient)

interface MintPassesState {
  allowlist: {
    entities: {}
    status: Status
    error: ErrorType
  }
  tokens: {
    status: Status
    error: ErrorType
    entities: []
  }
  claims: {
    id: string
    data?: {}
    status?: Status
    error?: ErrorType
  }[]
}

const initialState = {
  allowlist: {
    entities: {},
    status: 'idle',
    error: null,
  },
  tokens: {
    entities: [],
    status: 'idle',
    error: null,
  },
  claims: [],
} as MintPassesState

// Then, handle actions in your reducers:
export const mintPassesSlice = createSlice({
  name: 'MintPass',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(claim.pending, (state, action) => {
        const {
          meta: {
            arg: { contract, tokenId },
          },
        } = action

        const claim = find(propEq('id', `${contract}_${tokenId}`))(state.claims)
        if (isNil(claim)) {
          state.claims.push({
            id: `${contract}_${tokenId}`,
            status: 'loading',
            data: {},
            error: null,
          })
        } else {
          const claimIndex = findIndex(propEq('id', `${contract}_${tokenId}`))(state.claims)
          state.claims[claimIndex] = {
            ...claim,
            status: 'loading',
          }
        }
      })
      .addCase(claim.fulfilled, (state, action) => {
        const {
          meta: {
            arg: { contract, tokenId },
          },
          payload,
        } = action

        const claim = find(propEq('id', `${contract}_${tokenId}`))(state.claims)
        if (isNil(claim)) {
          state.claims.push({
            id: `${contract}_${tokenId}`,
            status: 'succeeded',
            data: payload,
            error: null,
          })
        } else {
          const claimIndex = findIndex(propEq('id', `${contract}_${tokenId}`))(state.claims)
          state.claims[claimIndex] = {
            ...claim,
            status: 'succeeded',
            data: payload,
          }
        }
      })
      .addCase(claim.rejected, (state, action) => {
        const {
          meta: {
            arg: { contract, tokenId },
          },
          payload,
          error: { message },
        } = action
        const claim = find(propEq('id', `${contract}_${tokenId}`))(state.claims)
        if (isNil(claim)) {
          state.claims.push({
            id: `${contract}_${tokenId}`,
            status: 'failed',
            data: {},
            error: payload ? (payload as string) : message,
          })
        } else {
          const claimIndex = findIndex(propEq('id', `${contract}_${tokenId}`))(state.claims)
          state.claims[claimIndex] = {
            ...claim,
            status: 'failed',
            error: payload ? (payload as string) : message,
          }
        }
      })
  },
})

export const { reducer } = mintPassesSlice

export const selectAllowlistLoadingState = (state: RootState) => state.mintPasses.allowlist.status
export const selectTokensLoadingState = (state: RootState) => state.mintPasses.tokens.status

export const selectTokens = (state: RootState) => ({
  data: state.mintPasses.tokens.entities,
  status: state.mintPasses.tokens.status,
  error: state.mintPasses.tokens.error,
})

export const selectToken = (pass: string) => (state: RootState) =>
  pipe(path(['mintPasses', 'tokens', 'entities']), find(propEq('name', pass)))(state) as {
    name: string
    image: string
    description: string
    tokenId: number
    contract: string
  }
