import { ActionCreatorWithPayload, isAnyOf, ListenerEffectAPI, PayloadAction } from '@reduxjs/toolkit'

import { AppDispatch, RootState } from '../../common/redux/store'
import { show } from './modal.slice'

export const middleware = (actionCreators: ActionCreatorWithPayload<string>[]) => ({
  // @ts-ignore
  matcher: isAnyOf(...actionCreators),
  effect: (action: PayloadAction<string>, listenerApi: ListenerEffectAPI<RootState, AppDispatch>) => {
    listenerApi.dispatch(show({ modal: action.type, payload: action.payload }))
  },
})
