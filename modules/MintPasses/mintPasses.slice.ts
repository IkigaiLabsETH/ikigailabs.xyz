import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../common/redux/store'

import { ErrorType, Status } from '../../common/types'
import { http, HTTP } from '../../common/http'
import { ContractTokenId } from '../../common/config'
import { find, findIndex, isNil, map, path, pipe, propEq } from 'ramda'
import { web3, Web3 } from '../../common/web3'

export const showMintPassDetails = createAction<any>('MintPassess/show')

export const joinAllowlistTh = (http: HTTP) =>
  createAsyncThunk<Promise<{} | Error>, { address: string }>(
    'MintPasses/joinAllowList',
    ({ address }, { rejectWithValue }) =>
      http
        .post('allowlist', { address })
        .then(response => response)
        .catch(error => rejectWithValue(error.response.data.error)),
  )

export const joinAllowlist = joinAllowlistTh(http)

export const fetchMintpassesTh = (web3: Web3) =>
  createAsyncThunk<any, { mintPasses: ContractTokenId[] }>('MintPasses/fetch', ({ mintPasses }, { rejectWithValue }) =>
    Promise.all(
      map(([contract, tokenId]) =>
        web3
          .getEditionDrop(contract)
          .then(response => response.metadata.get())
          .then(({ name, description, image, symbol }) => ({
            contract,
            tokenId,
            name,
            description,
            image,
            symbol,
          }))
          .catch(error => rejectWithValue(error.message)),
      )(mintPasses),
    ),
  )

export const fetchMintpasses = fetchMintpassesTh(web3)

export const claimTh = (web3: Web3) =>
  createAsyncThunk<Promise<{} | Error>, { contract: string; address: string; tokenId: number; amount: number }>(
    'MintPasses/claim',
    ({ contract, address, tokenId, amount }, { rejectWithValue }) =>
      web3
        .getEditionDrop(contract)
        .then(response => response.claimTo(address, tokenId, amount))
        .then(response => response)
        .catch(error => rejectWithValue(error.message)),
  )

export const claim = claimTh(web3)

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
      .addCase(joinAllowlist.pending, (state, action) => {
        state.allowlist.status = 'loading'
      })
      .addCase(joinAllowlist.fulfilled, (state, action) => {
        const { payload } = action
        state.allowlist.status = 'succeeded'
        // @ts-ignore
        state.entities = { address: payload.data.data }
      })
      .addCase(joinAllowlist.rejected, (state, action) => {
        const { payload } = action
        state.allowlist.status = 'failed'
        if (payload) {
          // @ts-ignore
          state.error = payload
          state.allowlist.entities = {}
        } else {
          state.allowlist.error = action.error.message
        }
      })
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
      .addCase(fetchMintpasses.pending, (state, action) => {
        state.tokens.status = 'loading'
      })
      .addCase(fetchMintpasses.fulfilled, (state, action) => {
        const { payload } = action
        state.tokens.entities = payload
        state.tokens.status = 'succeeded'
      })
      .addCase(fetchMintpasses.rejected, (state, action) => {
        const { payload } = action

        state.tokens.entities = []
        state.tokens.status = 'failed'
        if (payload) {
          state.tokens.error = action.payload as string
        } else {
          state.tokens.error = action.error.message
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

export const selectToken = (pass: string) => (state: RootState) => pipe(path(['mintPasses', 'tokens', 'entities']), find(propEq('name', pass)))(state) as { name: string, image: string, description: string, tokenId: number, contract: string }

// export const selectClaim = (tokenId: string) => (state: RootState) => state.mintPasses.claims
