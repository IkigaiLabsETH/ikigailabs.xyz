import { ListenerEffectAPI, PayloadAction } from '@reduxjs/toolkit'
import { pathOr } from 'ramda'

import { AppDispatch, RootState } from '../../common/redux/store'
import {
  fetchCollection,
  getCollectionAttributesByContract,
  getCollectionByContract,
  getCollectionActivityByContract,
} from './collection.api'
import { Network } from '../../common/types'

export const middleware = {
  actionCreator: fetchCollection,
  effect: (
    action: PayloadAction<{ contract: string; network: Network }>,
    listenerApi: ListenerEffectAPI<RootState, AppDispatch>,
  ) => {
    const params = {
      contract: pathOr('', ['payload', 'contract'])(action),
      network: pathOr(Network.MAINNET, ['payload', 'network'])(action),
    }
    listenerApi.dispatch(getCollectionByContract.initiate(params))
    listenerApi.dispatch(getCollectionActivityByContract.initiate(params))
    listenerApi.dispatch(getCollectionAttributesByContract.initiate(params))
  },
}
