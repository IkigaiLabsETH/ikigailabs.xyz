import { ListenerEffectAPI, PayloadAction } from '@reduxjs/toolkit'
import { pathOr } from 'ramda'

import { AppDispatch, RootState } from '../../../common/redux/store'
import { fetchCollectionToken } from './token.actions'
import { collectionTokenApi } from './token.api'

export const middleware = {
  actionCreator: fetchCollectionToken,
  effect: (
    action: PayloadAction<{ contract: string; tokenId: string }>,
    listenerApi: ListenerEffectAPI<RootState, AppDispatch>,
  ) => {
    listenerApi.dispatch(collectionTokenApi.endpoints.getTokenByContractAndTokenId.initiate({
      contract: pathOr('', ['payload', 'contract'])(action),
      tokenId: pathOr('', ['payload', 'tokenId'])(action)
    }))
  },
}
