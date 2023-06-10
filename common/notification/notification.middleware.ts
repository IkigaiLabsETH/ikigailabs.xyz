import { isAnyOf, isFulfilled, isRejected, PayloadAction } from '@reduxjs/toolkit'
import { join, path, pipe, pluck, values } from 'ramda'
import { toast } from 'react-toastify'

export const middleware = (notifications: Record<string, string>) => (actionCreators: any[]) => ({
  // @ts-ignore
  matcher: isAnyOf(...actionCreators),
  effect: (action: PayloadAction<{ message: string; errors?: string[] }>) => {
    if (isRejected(action)) {
      if (action.payload?.message) {
        if (action.payload?.errors) {
          toast.error(
            `${action.payload?.message}: ${pipe(
              path(['payload', 'errors']),
              values,
              pluck('message'),
              join(', '),
            )(action)}`,
          )
          return
        }

        toast.error(action.payload.message)
        return
      }
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
