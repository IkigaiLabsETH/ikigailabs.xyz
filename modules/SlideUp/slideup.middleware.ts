import { ActionCreatorWithPayload, isAnyOf, ListenerEffectAPI, PayloadAction } from '@reduxjs/toolkit'

import { AppDispatch, RootState } from '../../common/redux/store'
import { show, hide } from './slideUp.slice'

export const openSlideUpMiddleware = (actionCreators: ActionCreatorWithPayload<string>[]) => ({
  // @ts-ignore
  matcher: isAnyOf(...actionCreators),
  effect: (action: PayloadAction<string>, listenerApi: ListenerEffectAPI<RootState, AppDispatch>) => {
    listenerApi.dispatch(show({ slideUp: action.type, payload: action.payload }))
  },
})

export const closeSlideUpMiddleware = (actionCreators: ActionCreatorWithPayload<string>[]) => ({
  // @ts-ignore
  matcher: isAnyOf(...actionCreators),
  effect: (action: PayloadAction<string>, listenerApi: ListenerEffectAPI<RootState, AppDispatch>) => {
    listenerApi.dispatch(hide())
  },
})
