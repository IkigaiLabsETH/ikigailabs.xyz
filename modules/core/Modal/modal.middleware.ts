import { ActionCreatorWithPayload, isAnyOf, ListenerEffectAPI, PayloadAction } from '@reduxjs/toolkit'

import { AppDispatch, RootState } from '../../common/redux/store'
import { show, hide } from './modal.slice'

export const openModalMiddleware = (actionCreators: ActionCreatorWithPayload<string>[]) => ({
  // @ts-ignore
  matcher: isAnyOf(...actionCreators),
  effect: (action: PayloadAction<string>, listenerApi: ListenerEffectAPI<RootState, AppDispatch>) => {
    listenerApi.dispatch(show({ modal: action.type, payload: action.payload }))
  },
})

export const closeModalMiddleware = (actionCreators: ActionCreatorWithPayload<string>[]) => ({
  // @ts-ignore
  matcher: isAnyOf(...actionCreators),
  effect: (action: PayloadAction<string>, listenerApi: ListenerEffectAPI<RootState, AppDispatch>) => {
    listenerApi.dispatch(hide())
  },
})
