import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { prop } from 'ramda'

import { explorerApi } from '../../common/nftExplorer'
import { ErrorType, HTTP, Status } from '../../common/types'



export const fetchDropActivityTh = (explorerApi: HTTP) =>
  createAsyncThunk<any, { contract: string }, { rejectValue: string }>(
    'dropActivity/fetch',
    ({ contract }, { rejectWithValue }) =>
      explorerApi
        .get(`collections/${contract}/activity/v3?limit=20&sortBy=eventTimestamp&includeMetadata=true`)
        .then(({ data }) => prop('activities')(data))
        .catch(e => rejectWithValue(e.message))
  )
export const fetchDropActivity = fetchDropActivityTh(explorerApi)

interface DropActivityNFTState {
  entities: []
  status: Status
  error: ErrorType
}

const initialState = {
  entities: [],
  status: 'idle',
  error: null,
} as DropActivityNFTState

// Then, handle actions in your reducers:
export const dropActivitySlice = createSlice({
  name: 'dropActivity',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: builder => {
    builder
      .addCase(fetchDropActivity.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchDropActivity.fulfilled, (state, action) => {
        const { payload } = action
        console.log(payload)
        state.status = 'succeeded'
        // @ts-ignore
        state.entities = payload
        state.error = null
      })
      .addCase(fetchDropActivity.rejected, (state, action) => {
        const { payload } = action
        state.status = 'failed'
        if (payload) {
          state.error = action.payload
        } else {
          state.error = action.error.message
        }
      })
  },
})

export const { reducer } = dropActivitySlice

export const selectDropActivity = prop('dropActivity')
