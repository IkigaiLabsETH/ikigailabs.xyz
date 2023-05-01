import { isAnyOf, isFulfilled, isRejected, PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

export const middleware = (notifications: Record<string, string>) => (actionCreators: any[]) => ({
  // @ts-ignore
  matcher: isAnyOf(...actionCreators),
  effect: (action: PayloadAction<string>) => {
    if (isRejected(action)) {
      console.log(action.error)
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
