import { ActionCreatorWithPayload, isAnyOf, ListenerEffectAPI, PayloadAction } from '@reduxjs/toolkit'

import { AppDispatch, RootState } from '../../common/redux/store'
import { hideModal } from '../Modal'
import { show, hide } from './confetti.slice'

export const showConfettiMiddleware = (actionCreators: ActionCreatorWithPayload<string>[]) => ({
  // @ts-ignore
  matcher: isAnyOf(...actionCreators),
  effect: (action: PayloadAction<string>, listenerApi: ListenerEffectAPI<RootState, AppDispatch>) => {
    listenerApi.dispatch(show())
  },
})

export const hideConfettiMiddleware = (actionCreators: ActionCreatorWithPayload<string>[]) => ({
  // @ts-ignore
  matcher: isAnyOf(...actionCreators),
  effect: (action: PayloadAction<string>, listenerApi: ListenerEffectAPI<RootState, AppDispatch>) => {
    listenerApi.dispatch(hide())
  },
})
