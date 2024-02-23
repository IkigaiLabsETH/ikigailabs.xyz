import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { jsonRpcProvider } from '../web3'

export const lookupAddressTh = (provider: any) =>
  createAsyncThunk<{ name: string; avatar: string }, { address: string }>(
    'ens/lookupAddress',
    async ({ address }, { rejectWithValue }) => {
      try {
        const name = await provider.lookupAddress(address)
        const resolvedAddress = await provider.resolveName(name)
        const avatar = await provider.getAvatar(address)
        return {
          name: resolvedAddress === address ? '' : name,
          avatar,
        }
      } catch (err) {
        return rejectWithValue(err)
      }
    },
  )

export const lookupAddress = lookupAddressTh(jsonRpcProvider)

type ENS = {
  address: string
  name?: string
  avatar?: string
}

const ensAdapter = createEntityAdapter({
  selectId: (ens: ENS) => ens.address,
})

const initialState = ensAdapter.getInitialState({
  status: 'idle',
})

export const ENSSlice = createSlice({
  name: 'ENS',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(lookupAddress.pending, state => {
      state.status = 'pending'
    })
    builder.addCase(lookupAddress.fulfilled, (state, action) => {
      const {
        payload,
        type,
        meta: {
          arg: { address },
        },
      } = action
      state.status = 'succeeded'
      ensAdapter.addOne(state, { payload: { address, name: payload?.name, avatar: payload?.avatar }, type })
    })
    builder.addCase(lookupAddress.rejected, state => {
      state.status = 'failed'
    })
  },
})

export const reducer = ENSSlice.reducer
export const { selectById: selectENSByAddress } = ensAdapter.getSelectors((state: any) => state.ens ?? initialState)
export const selectEnsStatus = (state: any) => state.ens.status
