import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { RootState } from '../../common/redux/store'
import { getTWClient, Web3 } from '../../common/web3'
import { Network } from '../../common/types'

export const checkTokenBalancesForCollection = createAction<{ collection: {}; address: string }>(
  'BurnToMint/checkTokenBalancesForCollection',
)

export const _burnToMint = (web3Client: (chain: Network) => Web3) =>
  createAsyncThunk<
    Promise<any>,
    { sourceContract: string; address: string; targetContract: string; tokenId: string; network: Network },
    { rejectValue: string }
  >('BurnToMint/init', async ({ sourceContract, targetContract, address, tokenId, network }, { rejectWithValue }) => {
    const web3 = web3Client(network)
    try {
      const source = await web3.getContract(sourceContract)
      const target = await web3.getContract(targetContract)

      const hasApproval = await source?.call('isApprovedForAll', [address, target?.getAddress()])

      const balance = await source?.call('balanceOf', [address, tokenId])

      if (!hasApproval) {
        // Set approval
        await source?.call('setApprovalForAll', [target?.getAddress(), true])
      }

      if (balance < 1) {
        throw new Error('No tokens found to burn')
      }

      await source?.call('claim', [address!, 1])
    } catch (error) {
      return rejectWithValue(error.message)
    }
  })

export const burnToMint = _burnToMint(getTWClient)

interface BurnToMintState {
  entities: {}
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null | undefined
}

const initialState = {
  entities: {},
  status: 'idle',
  error: null,
} as BurnToMintState

// Then, handle actions in your reducers:
export const burnToMintSlice = createSlice({
  name: 'burnToMint',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(burnToMint.pending, state => {
        state.status = 'loading'
      })
      .addCase(burnToMint.fulfilled, (state, action) => {
        const { payload } = action
        state.status = 'succeeded'
      })
      .addCase(burnToMint.rejected, (state, action) => {
        const { payload } = action
        state.status = 'failed'
        if (payload) {
          state.error = action.payload
        } else {
          state.error = action.error.message
        }
      })
  },
})

export const { reducer, actions } = burnToMintSlice

// Other code such as selectors can use the imported `RootState` type
export const selectBurnToMint = (state: RootState) => state.burnToMint
