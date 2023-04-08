import { ListenerEffectAPI, PayloadAction } from '@reduxjs/toolkit'

import { AppDispatch, RootState } from '../../common/redux/store'
import { claimToken } from './drop.slice'

export const middleware = {
  actionCreator: claimToken.fulfilled,
  effect: (action: PayloadAction<{ contract: string }>, listenerApi: ListenerEffectAPI<RootState, AppDispatch>) => {
    console.log('claimToken.fulfilled', action)
  },
}
