import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../common/redux/store'

interface SlideUpState {
  slideUp: string | null
  data: any
  open: boolean
}

const initialState = {
  slideUp: null,
  data: null,
  open: false,
} as SlideUpState

export const slideUpSlice = createSlice({
  name: 'SlideUp',
  initialState,
  reducers: {
    show(state, action: PayloadAction<{ slideUp: string; payload: any }>) {
      state.slideUp = action.payload.slideUp
      state.data = action.payload.payload
      state.open = true
    },
    hide(state) {
      state.open = false
    },
  },
})

export const { reducer } = slideUpSlice
export const { show, hide } = slideUpSlice.actions

export const selectSlideUp = (state: RootState) => state.slideUp
