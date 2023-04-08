import { ActionCreatorWithPayload, isAnyOf, ListenerEffectAPI, PayloadAction } from '@reduxjs/toolkit'

import { AppDispatch, RootState } from '../../common/redux/store'
import { hideModal } from '../Modal'
import { show, hide } from './confetti.slice'

export const middleware = (actionCreators: ActionCreatorWithPayload<string>[]) => ({
  // @ts-ignore
  matcher: isAnyOf(...actionCreators),
  effect: (action: PayloadAction<string>, listenerApi: ListenerEffectAPI<RootState, AppDispatch>) => {
    console.log(action)
    listenerApi.dispatch(show())

    if (action.type === hideModal.type) {
      listenerApi.dispatch(hide())
    }
  },
})
