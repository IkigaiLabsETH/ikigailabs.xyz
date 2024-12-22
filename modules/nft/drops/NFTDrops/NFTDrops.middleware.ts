import { Action, ListenerEffectAPI } from '@reduxjs/toolkit'
// import { NFTDrops } from '../../common/config'

import { AppDispatch, RootState } from '../../common/redux/store'
import { Web3 } from '../../common/web3'
import { appInit } from '../App/app.reducer'
// import { fetchNFTDrops } from './NFTDrops.slice'

export const middleware = (web3: Web3) => ({
  actionCreator: appInit,
  effect: (action: Action, listenerApi: ListenerEffectAPI<RootState, AppDispatch>) => {
    // listenerApi.dispatch(fetchNFTDrops({ web3, contracts: NFTDrops }))
  },
})
