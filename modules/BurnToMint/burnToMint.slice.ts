import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { RootState } from '../../common/redux/store'
import { web3, Web3 } from '../../common/web3'

export const _burnToMint = (web3: Web3) => createAsyncThunk<
  Promise<any>,
  { elevenFiftyFiveContractAddress: string; address: string; sevenTwentyOneContractAddress: string; tokenId: string },
  { rejectValue: string }
>('BurnToMint/start', async ({ elevenFiftyFiveContractAddress, sevenTwentyOneContractAddress, address }, { rejectWithValue }) => {
    try {
      console.log(elevenFiftyFiveContractAddress, sevenTwentyOneContractAddress)
      const elevenFiftyFiveContract = await web3.getContract(elevenFiftyFiveContractAddress)
      const sevenTwentyOneContract = await web3.getContract(sevenTwentyOneContractAddress)

      const hasApproval = await elevenFiftyFiveContract?.call(
        "isApprovedForAll",
        address,
        sevenTwentyOneContract?.getAddress()
      )

      const balance = await elevenFiftyFiveContract?.call("balanceOf", address, 0);

      if (!hasApproval) {
        // Set approval
        await elevenFiftyFiveContract?.call(
          "setApprovalForAll",
          sevenTwentyOneContract?.getAddress(),
          true
        )
      }

      if (balance < 1) {
        throw new Error("No tokens found to burn")
      }

      await sevenTwentyOneContract?.call("claim", address!, 1)

    } catch(error) {
      return rejectWithValue(error.message)
    }
  }
)

export const burnToMint = _burnToMint(web3)

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
  reducers: {
  },
  extraReducers: builder => {
    builder
      .addCase(burnToMint.pending, (state, action) => {
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

export const { reducer } = burnToMintSlice

// Other code such as selectors can use the imported `RootState` type
export const selectBurnToMint = (state: RootState) => state.burnToMint
