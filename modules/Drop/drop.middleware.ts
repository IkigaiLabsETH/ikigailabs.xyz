import { ListenerEffectAPI, PayloadAction } from '@reduxjs/toolkit'
import { prop } from 'ramda'

import { AppDispatch, RootState } from '../../common/redux/store'
import {
  fetchDrop,
  fetchDropMetadata,
  fetchDropClaimedSupply,
  fetchDropClaimConditions,
  fetchDropTokens,
  fetchDropUnclaimedSupply,
} from './drop.slice'

export const middleware = {
  actionCreator: fetchDrop,
  effect: (action: PayloadAction<{ contract: string }>, listenerApi: ListenerEffectAPI<RootState, AppDispatch>) => {
    listenerApi.dispatch(fetchDropMetadata(prop('payload')(action)))
    listenerApi.dispatch(fetchDropClaimedSupply(prop('payload')(action)))
    listenerApi.dispatch(fetchDropUnclaimedSupply(prop('payload')(action)))
    listenerApi.dispatch(fetchDropClaimConditions(prop('payload')(action)))
    listenerApi.dispatch(fetchDropTokens(prop('payload')(action)))
  },
}
