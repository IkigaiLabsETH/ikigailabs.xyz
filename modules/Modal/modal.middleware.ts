import { ActionCreatorWithPayload, isAnyOf, ListenerEffectAPI, PayloadAction } from '@reduxjs/toolkit'

import { AppDispatch, RootState } from '../../common/redux/store'
import { Modal } from '../../common/types'
import { show } from './modal.slice'

export const middleware =
  (modalsMap: { [key: string]: Modal }) => (actionCreators: ActionCreatorWithPayload<Modal>[]) => ({
    // @ts-ignore
    matcher: isAnyOf(...actionCreators),
    effect: (action: PayloadAction<Modal>, listenerApi: ListenerEffectAPI<RootState, AppDispatch>) => {
      listenerApi.dispatch(show({ modal: modalsMap[action.type], payload: action.payload }))
    },
  })
