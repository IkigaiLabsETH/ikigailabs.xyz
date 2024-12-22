import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { find, findIndex, isNil, path, pipe, propEq, propOr } from 'ramda'
import { QueryStatus } from '@reduxjs/toolkit/query'

import { RootState } from '../../common/redux/store'
import { Network, Status } from '../../common/types'
import { Web3, getTWClient } from '../../common/web3'

interface ClaimEntity {
  id: string;
  status: Status;
  data: Record<string, any>;
  [key: string]: any;
}

interface FreeMintState {
  entities: {
    claims: ClaimEntity[];
  };
  loading: QueryStatus;
  error: string | null;
}

const initialState: FreeMintState = {
  entities: {
    claims: [],
  },
  loading: QueryStatus.uninitialized,
  error: null,
}

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

export const freeMintSlice = createSlice({
  name: 'freeMint',
  initialState,
  reducers: {},
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

        const claimId = `${contract}_${tokenId}`
        const claims = state.entities.claims as ClaimEntity[]
        const claim = claims.find(c => c.id === claimId)
        
        if (!claim) {
          claims.push({
            id: claimId,
            status: 'success' as Status,
            data: payload as Record<string, any>
          })
        } else {
          const claimIndex = claims.findIndex(c => c.id === claimId)
          claims[claimIndex] = {
            ...claims[claimIndex],
            status: 'success' as Status,
            data: payload as Record<string, any>
          }
        }
      })
      .addCase(claim.rejected, (state, action) => {
        const {
          payload,
          error: { message },
        } = action

        state.error = payload as string ?? message ?? null
      })
  },
})

export const { reducer } = freeMintSlice

export const selectClaimLoadingState = (tokenId: string) => (state: RootState): Status => {
  const claims = path(['freeMint', 'entities', 'claims'])(state) as ClaimEntity[]
  const claim = claims?.find(c => c.id === tokenId)
  return claim?.status ?? 'idle' as Status
}

export const selectClaim = (tokenId: string) => (state: RootState): Record<string, any> => {
  const claims = path(['freeMint', 'entities', 'claims'])(state) as ClaimEntity[]
  const claim = claims?.find(c => c.id === tokenId)
  return claim?.data ?? {}
}
