import { ListenerEffectAPI, PayloadAction } from '@reduxjs/toolkit'
import { pathOr, prop } from 'ramda'

import { AppDispatch, RootState } from '../../common/redux/store'
import {
  fetchCollection,
  getCollectionAttributesByContract,
  getCollectionByContract,
  getCollectionActivityByContract,
} from './collection.api'

export const middleware = {
  actionCreator: fetchCollection,
  effect: (action: PayloadAction<{ contract: string }>, listenerApi: ListenerEffectAPI<RootState, AppDispatch>) => {
    listenerApi.dispatch(getCollectionByContract.initiate(pathOr('', ['payload', 'contract'])(action)))
    listenerApi.dispatch(getCollectionActivityByContract.initiate(pathOr('', ['payload', 'contract'])(action)))
    listenerApi.dispatch(getCollectionAttributesByContract.initiate(pathOr('', ['payload', 'contract'])(action)))
  },
}
