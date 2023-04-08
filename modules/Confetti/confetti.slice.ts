import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../common/redux/store'

interface ConfettiState {
  show: boolean
}

const initialState = {
  show: false,
} as ConfettiState

export const confettiSlice = createSlice({
  name: 'confetti',
  initialState,
  reducers: {
    show(state) {
      state.show = true
    },
    hide(state) {
      state.show = false
    },
  },
})

export const { reducer } = confettiSlice
export const { show, hide } = confettiSlice.actions

export const selectConfetti = (state: RootState) => state.confetti
