import { ListenerEffectAPI, PayloadAction, isFulfilled } from '@reduxjs/toolkit'
import { omit, pathOr } from 'ramda'

import { AppDispatch, RootState } from '../../../common/redux/store'
import { fetchCollectionToken } from './token.actions'
import { collectionTokenApi } from './token.api'
import { Network } from '../../../common/types'
import { collectionApi } from '../collection.api'
import { lookupAddress } from '../../../common/ens'

export const middleware = {
  actionCreator: fetchCollectionToken,
  effect: (
    action: PayloadAction<{ contract: string; tokenId: string }>,
    listenerApi: ListenerEffectAPI<RootState, AppDispatch>,
  ) => {
    const params = {
      contract: pathOr('', ['payload', 'contract'])(action),
      tokenId: pathOr('', ['payload', 'tokenId'])(action),
      network: pathOr(Network.MAINNET, ['payload', 'network'])(action),
    }
    listenerApi.dispatch(collectionTokenApi.endpoints.getTokenByContractAndTokenId.initiate(params))
    listenerApi.dispatch(collectionApi.endpoints.getCollectionByContract.initiate(omit(['tokenId'])(params)))
  },
}

export const tokenFetchCompleteMiddleware = {
  matcher: collectionTokenApi.endpoints.getTokenByContractAndTokenId.matchFulfilled,
  effect: (
    action: PayloadAction<{ token: { owner: string } }>,
    listenerApi: ListenerEffectAPI<RootState, AppDispatch>,
  ) => {
    listenerApi.dispatch(lookupAddress({ address: action?.payload.token?.owner }))
  },
}
