import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { prop } from 'ramda'

import { explorerApi } from '../../../common/nftExplorer'
import { HTTP } from '../../../common/types'
import { collectionActivityAdapter } from './collectionActivity.entityAdapter'

export const fetchCollectionActivityTh = (explorerApi: HTTP) =>
  createAsyncThunk<any, { contract: string }, { rejectValue: string }>(
    'collectionActivity/fetch',
    ({ contract }, { rejectWithValue }) =>
      explorerApi
        .get(`collections/${contract}/activity/v3?limit=20&sortBy=eventTimestamp&includeMetadata=true`)
        .then(({ data }) => prop('activities')(data))
        .catch(e => rejectWithValue(e.message)),
  )
export const fetchCollectionActivity = fetchCollectionActivityTh(explorerApi)

export const collectionActivitySlice = createSlice({
  name: 'collectionActivity',
  initialState: collectionActivityAdapter.getInitialState({ status: 'idle', error: null }),
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCollectionActivity.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchCollectionActivity.fulfilled, (state, action) => {
        const {
          payload,
          meta: {
            arg: { contract },
          },
        } = action
        state.status = 'succeeded'
        collectionActivityAdapter.setOne(state, {
          contract: contract,
          activity: payload,
        })
        state.error = null
      })
      .addCase(fetchCollectionActivity.rejected, (state, action) => {
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

export const { reducer } = collectionActivitySlice
