import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../common/redux/store'

interface ModalState {
  modal: string | null
  data: any
  open: boolean
}

const initialState = {
  modal: null,
  data: null,
  open: false,
} as ModalState

export const modalSlice = createSlice({
  name: 'Modal',
  initialState,
  reducers: {
    show(state, action: PayloadAction<{ modal: string; payload: any }>) {
      state.modal = action.payload.modal
      state.data = action.payload.payload
      state.open = true
    },
    hide(state) {
      state.open = false
    },
  },
})

export const { reducer } = modalSlice
export const { show, hide } = modalSlice.actions

export const selectModal = (state: RootState) => state.modal
