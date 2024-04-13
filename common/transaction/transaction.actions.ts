import { createAction } from '@reduxjs/toolkit'

export const transactionSent = createAction<string>('transaction/sent')
export const transactionFailed = createAction<Record<string, any>>('transaction/failed')
