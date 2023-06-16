import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { find, findIndex, isNil, path, pipe, propEq, propOr } from 'ramda'
import { QueryStatus } from '@reduxjs/toolkit/dist/query'

import { RootState } from '../../common/redux/store'
import { Network, Status } from '../../common/types'
import { Web3, getTWClient } from '../../common/web3'

export const claimTh = (web3Client: (chain: Network) => Web3) =>
  createAsyncThunk<
    Promise<{} | Error>,
    { contract: string; address: string; tokenId: number; amount: number; network: Network }
  >('freeMint/claim', ({ contract, address, amount, network }, { rejectWithValue }) => {
    const web3 = web3Client(network)
    return web3
      .getContract(contract, 'nft-drop')
      .then(response => response.claimTo(address, amount))
      .catch(error => rejectWithValue(error.message))
  })

export const claim = claimTh(getTWClient)

interface FreeMintState {
  entities: []
  loading: QueryStatus
  error: string | null
}

const initialState = {
  entities: [],
  loading: QueryStatus.uninitialized,
  error: null,
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
      .addCase(claim.pending, state => {
        state.loading = QueryStatus.pending
      })
      .addCase(claim.fulfilled, (state, action) => {
        const {
          meta: {
            arg: { contract, tokenId },
          },
          payload,
        } = action

        const claim = find(propEq('id', `${contract}_${tokenId}`))(state.entities)
        if (isNil(claim)) {
          state.entities.push(payload as never)
        } else {
          const claimIndex = findIndex(propEq('id', `${contract}_${tokenId}`))(state.entities)
          state.entities[claimIndex] = payload as never
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

        state.error = payload ? (payload as string) : message
      })
  },
})

export const { reducer } = freeMintSlice

export const selectClaimLoadingState = (tokenId: string) => (state: RootState) =>
  pipe(path(['freeMint', 'entities', 'claims']), find(propEq('id', tokenId)), propOr('idle', 'status'))(state) as Status
export const selectClaim = (tokenId: string) => (state: RootState) =>
  pipe(path(['freeMint', 'entities', 'claims']), find(propEq('id', tokenId)), propOr({}, 'data'))(state) as Record<
    string,
    any
  >
