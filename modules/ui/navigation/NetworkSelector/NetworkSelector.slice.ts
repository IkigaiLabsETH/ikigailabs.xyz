import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Network } from '../../common/types'

interface NetworkState {
  selectedNetwork: Network
}

interface ChangeNetworkPayload {
  network: Network
}

const initialState = { selectedNetwork: Network.MAINNET } as NetworkState

const networkSlice = createSlice({
  name: 'network',
  initialState,
  reducers: {
    changeNetwork(state, action: PayloadAction<ChangeNetworkPayload>) {
      const { payload } = action
      state.selectedNetwork = payload.network
    },
  },
})

export const { changeNetwork } = networkSlice.actions
export const reducer = networkSlice.reducer
export const selectedNetwork = (state: { network: NetworkState }) => state.network.selectedNetwork
