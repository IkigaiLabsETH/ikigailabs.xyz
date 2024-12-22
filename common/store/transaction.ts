import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TransactionResponse, TransactionReceipt } from '@/common/types'

interface TransactionState {
  pending: Record<string, TransactionResponse>
  receipts: Record<string, TransactionReceipt>
}

const initialState: TransactionState = {
  pending: {},
  receipts: {},
}

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    addPendingTransaction: (state, action: PayloadAction<TransactionResponse>) => {
      state.pending[action.payload.hash] = action.payload
    },
    removePendingTransaction: (state, action: PayloadAction<string>) => {
      delete state.pending[action.payload]
    },
    addTransactionReceipt: (state, action: PayloadAction<{ hash: string; receipt: TransactionReceipt }>) => {
      state.receipts[action.payload.hash] = action.payload.receipt
      delete state.pending[action.payload.hash]
    },
  },
})

export const { addPendingTransaction, removePendingTransaction, addTransactionReceipt } = transactionSlice.actions
export const transactionReducer = transactionSlice.reducer 