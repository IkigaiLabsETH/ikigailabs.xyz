import { Action, ListenerEffectAPI } from '@reduxjs/toolkit'
import { FREE_MINT_CONTRACT, FREE_MINT_TOKEN_ID } from '../../common/config'

import { AppDispatch, RootState } from '../../common/redux/store'
import { appInit } from '../App/app.reducer'
import { fetchToken } from './freeMint.slice'

export const middleware = ({
  actionCreator: appInit,
  effect: (action: Action, listenerApi: ListenerEffectAPI<RootState, AppDispatch>) => {
    listenerApi.dispatch(fetchToken({ contract: FREE_MINT_CONTRACT, tokenId: FREE_MINT_TOKEN_ID }))
  },
})
