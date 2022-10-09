import { Action, ListenerEffectAPI } from '@reduxjs/toolkit'
import { ContractTokenId, MINT_PASSES } from '../../common/config'
// import { NFTDrops } from '../../common/config'

import { AppDispatch, RootState } from '../../common/redux/store'
import { appInit } from '../App/app.reducer'
import { fetchMintpasses } from './mintPasses.slice'

export const middleware = ({
  actionCreator: appInit,
  effect: (action: Action, listenerApi: ListenerEffectAPI<RootState, AppDispatch>) => {
    listenerApi.dispatch(fetchMintpasses({ mintPasses: MINT_PASSES as ContractTokenId[] }))
  },
})
