import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { find, findIndex, isNil, lensProp, path, pathEq, pipe, prop, propEq, propOr, set, tap } from 'ramda'
import { RootState } from '../../common/redux/store'

import { ErrorType, Status, NFTMetadata, EditionDrop } from '../../common/types'
import { Web3, web3 } from '../../common/web3'

export const claimTh = (web3: Web3) =>
  createAsyncThunk<Promise<{} | Error>, { contract: string; address: string; tokenId: number; amount: number }>(
    'freeMint/claim',
    ({ contract, address, tokenId, amount }, { rejectWithValue }) =>
      web3
        .getEditionDrop(contract)
        .then(response => response.claimTo(address, tokenId, amount))
        .then(response => response)
        .catch(error => rejectWithValue(error.message)),
  )

export const claim = claimTh(web3)

export const fetchToken = createAsyncThunk<Promise<any>, { contract: string; web3: Web3; tokenId: number }>(
  'freeMint/fetchToken',
  ({ web3, contract, tokenId }, { rejectWithValue }) =>
    web3
      .getEditionDrop(contract)
      .then(response => response.metadata.get())
      .then(response => response)
      .catch(error => rejectWithValue(error.message)),
)

interface FreeMintState {
  entities: {
    tokens: {
      id: string
      status?: Status
      error?: ErrorType
      data?: {}
    }[]
    claims: {
      id: string
      status?: Status
      error?: ErrorType
      data?: {}
    }[]
  }
}

const initialState = {
  entities: {
    tokens: [],
    claims: [],
  },
} as FreeMintState

// Then, handle actions in your reducers:
export const freeMintSlice = createSlice({
  name: 'freeMint',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: builder => {
    builder
      .addCase(claim.pending, (state, action) => {
        const {
          meta: {
            arg: { contract, tokenId },
          },
        } = action

        const claim = find(propEq('id', `${contract}_${tokenId}`))(state.entities.claims)
        if (isNil(claim)) {
          state.entities.claims.push({
            id: `${contract}_${tokenId}`,
            status: 'loading',
            data: {},
            error: null,
          })
        } else {
          const claimIndex = findIndex(propEq('id', `${contract}_${tokenId}`))(state.entities.claims)
          state.entities.claims[claimIndex] = {
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

        const claim = find(propEq('id', `${contract}_${tokenId}`))(state.entities.claims)
        if (isNil(claim)) {
          state.entities.claims.push({
            id: `${contract}_${tokenId}`,
            status: 'succeeded',
            data: payload,
            error: null,
          })
        } else {
          const claimIndex = findIndex(propEq('id', `${contract}_${tokenId}`))(state.entities.claims)
          state.entities.claims[claimIndex] = {
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
        const claim = find(propEq('id', `${contract}_${tokenId}`))(state.entities.claims)
        if (isNil(claim)) {
          state.entities.claims.push({
            id: `${contract}_${tokenId}`,
            status: 'failed',
            data: {},
            error: payload ? (payload as string) : message,
          })
        } else {
          const claimIndex = findIndex(propEq('id', `${contract}_${tokenId}`))(state.entities.claims)
          state.entities.claims[claimIndex] = {
            ...claim,
            status: 'failed',
            error: payload ? (payload as string) : message,
          }
        }
      })
      .addCase(fetchToken.pending, (state, action) => {
        const {
          meta: {
            arg: { contract, tokenId },
          },
        } = action

        const token = find(propEq('id', `${contract}_${tokenId}`))(state.entities.tokens)
        if (isNil(token)) {
          state.entities.tokens.push({
            id: `${contract}_${tokenId}`,
            status: 'loading',
            data: {},
            error: null,
          })
        } else {
          const tokenIndex = findIndex(propEq('id', `${contract}_${tokenId}`))(state.entities.tokens)
          state.entities.tokens[tokenIndex] = {
            ...token,
            status: 'loading',
          }
        }
      })
      .addCase(fetchToken.fulfilled, (state, action) => {
        const {
          meta: {
            arg: { contract, tokenId },
          },
          payload,
        } = action

        const token = find(propEq('id', `${contract}_${tokenId}`))(state.entities.tokens)
        if (isNil(token)) {
          state.entities.tokens.push({
            id: `${contract}_${tokenId}`,
            status: 'succeeded',
            data: payload,
            error: null,
          })
        } else {
          const tokenIndex = findIndex(propEq('id', `${contract}_${tokenId}`))(state.entities.tokens)
          state.entities.tokens[tokenIndex] = {
            ...token,
            status: 'succeeded',
            data: payload,
          }
        }
      })
      .addCase(fetchToken.rejected, (state, action) => {
        const {
          meta: {
            arg: { contract, tokenId },
          },
          payload,
          error: { message },
        } = action

        const token = find(propEq('id', `${contract}_${tokenId}`))(state.entities.tokens)
        if (isNil(token)) {
          state.entities.tokens.push({
            id: `${contract}_${tokenId}`,
            status: 'failed',
            data: {},
            error: payload ? (payload as string) : message,
          })
        } else {
          const tokenIndex = findIndex(propEq('id', `${contract}_${tokenId}`))(state.entities.tokens)
          state.entities.tokens[tokenIndex] = {
            ...token,
            status: 'failed',
            error: payload ? (payload as string) : message,
          }
        }
      })
  },
})

export const { reducer } = freeMintSlice

export const selectTokenLoadingState = (tokenId: string) => (state: RootState) =>
  pipe(path(['freeMint', 'entities', 'tokens']), find(propEq('id', tokenId)), propOr('idle', 'status'))(state) as Status
export const selectClaimLoadingState = (tokenId: string) => (state: RootState) =>
  pipe(path(['freeMint', 'entities', 'claims']), find(propEq('id', tokenId)), propOr('idle', 'status'))(state) as Status

export const selectToken = (tokenId: string) => (state: RootState) =>
  pipe(path(['freeMint', 'entities', 'tokens']), find(propEq('id', tokenId)), propOr({}, 'data'))(state) as Record<
    string,
    any
  >
export const selectClaim = (tokenId: string) => (state: RootState) =>
  pipe(path(['freeMint', 'entities', 'claims']), find(propEq('id', tokenId)), propOr({}, 'data'))(state) as Record<
    string,
    any
  >