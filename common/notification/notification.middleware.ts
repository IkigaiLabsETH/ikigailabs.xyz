import { ActionCreatorWithPayload, isAnyOf, ListenerEffectAPI, PayloadAction } from '@reduxjs/toolkit'
import { AsyncThunkRejectedActionCreator } from '@reduxjs/toolkit/dist/createAsyncThunk'
import { toast } from 'react-toastify'

export const middleware = (notifications: Record<string, string>) => (actionCreators: ActionCreatorWithPayload<string> | AsyncThunkRejectedActionCreator<any>[]) => ({
    // @ts-ignore
    matcher: isAnyOf(...actionCreators),
    effect: (action: PayloadAction<string>) => {
      if (action.type.endsWith('/rejected')) {
        toast.error(notifications[action.type])
        return
      }

      if (action.type.endsWith('/fulfilled')) {
        toast.success(notifications[action.type] || '')
        return
      }

      toast.info(notifications[action.type] || '')
      return
    },
  })
