import {
  ActionCreatorWithPayload,
  isAnyOf,
  isFulfilled,
  isRejected,
  ListenerEffectAPI,
  PayloadAction,
} from '@reduxjs/toolkit'
import {
  AsyncThunkFulfilledActionCreator,
  AsyncThunkRejectedActionCreator,
} from '@reduxjs/toolkit/dist/createAsyncThunk'
import { toast } from 'react-toastify'

export const middleware = (notifications: Record<string, string>) => (actionCreators: any[]) => ({
  // @ts-ignore
  matcher: isAnyOf(...actionCreators),
  effect: (action: PayloadAction<string>) => {
    if (isRejected(action)) {
      toast.error(notifications[action.type])
      return
    }

    if (isFulfilled(action)) {
      toast.success(notifications[action.type])
      return
    }

    toast.info(notifications[action.type])
    return
  },
})
