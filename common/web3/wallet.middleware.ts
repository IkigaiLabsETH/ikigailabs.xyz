import { ActionCreator, isAnyOf, ListenerEffectAPI, PayloadAction } from '@reduxjs/toolkit'

import { AppDispatch, RootState } from '../../common/redux/store'
import { getBalance } from './wallet.api'
import { Network } from '../types'

export const middleware = (actionCreators: ActionCreator<string>[]) => ({
  // @ts-ignore
  matcher: isAnyOf(...actionCreators),
  effect: (
    action: PayloadAction<{ network: Network; address: string }>,
    listenerApi: ListenerEffectAPI<RootState, AppDispatch>,
  ) => {
    // location?.reload()
    // if (action.payload.address) {
    //   listenerApi.dispatch(getBalance.initiate({ address: action.payload.address, network: action.payload.network }))
    // }
  },
})
