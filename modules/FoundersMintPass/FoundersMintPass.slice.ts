import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../common/redux/store'

import { ErrorType, Status } from '../../common/types'
import { http, HTTP } from '../../common/http'

export const joinAllowlistTh = (http: HTTP) =>
  createAsyncThunk<Promise<{} | Error>, { address: string }>(
    'foundersMintPass/joinAllowList',
    ({ address }, { rejectWithValue }) =>
      http
        .post('allowlist', { address })
        .then(response => response)
        .catch(error => rejectWithValue(error.response.data.error)),
  )

export const joinAllowlist = joinAllowlistTh(http)

interface FoundersMintPassState {
  entities: any
  status: Status
  error: ErrorType
}

const initialState = {
  entities: {},
  status: 'idle',
  error: null,
} as FoundersMintPassState

// Then, handle actions in your reducers:
export const foundersMintPassSlice = createSlice({
  name: 'FoundersMintPass',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: builder => {
    builder
      .addCase(joinAllowlist.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(joinAllowlist.fulfilled, (state, action) => {
        const { payload } = action
        state.status = 'succeeded'
        // @ts-ignore
        state.entities = { address: payload.data.data }
      })
      .addCase(joinAllowlist.rejected, (state, action) => {
        const { payload } = action
        state.status = 'failed'
        if (payload) {
          // @ts-ignore
          state.error = payload
          state.entities = {}
        } else {
          state.error = action.error.message
        }
      })
  },
})

export const { reducer } = foundersMintPassSlice

export const selectLoadingState = (state: RootState) => state.FoundersMintPass.status
