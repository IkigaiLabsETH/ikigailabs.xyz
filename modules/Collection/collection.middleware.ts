import { ListenerEffectAPI, PayloadAction } from '@reduxjs/toolkit'
import { pathOr, prop } from 'ramda'

import { AppDispatch, RootState } from '../../common/redux/store'
import { collectionApi } from './collection.api'
import {
  fetchCollection,
  fetchCollectionMetadata,
  fetchCollectionClaimedSupply,
  fetchCollectionClaimConditions,
} from './collection.slice'

export const middleware = {
  actionCreator: fetchCollection,
  effect: (action: PayloadAction<{ contract: string }>, listenerApi: ListenerEffectAPI<RootState, AppDispatch>) => {
    listenerApi.dispatch(fetchCollectionMetadata(prop('payload')(action)))
    listenerApi.dispatch(fetchCollectionClaimedSupply(prop('payload')(action)))
    listenerApi.dispatch(fetchCollectionClaimConditions(prop('payload')(action)))
    listenerApi.dispatch(
      collectionApi.endpoints.getCollectionByContract.initiate(pathOr('', ['payload', 'contract'])(action)),
    )
    listenerApi.dispatch(
      collectionApi.endpoints.getCollectionActivityByContract.initiate(pathOr('', ['payload', 'contract'])(action)),
    )
    listenerApi.dispatch(
      collectionApi.endpoints.getCollectionAttributesByContract.initiate(pathOr('', ['payload', 'contract'])(action)),
    )
    listenerApi.dispatch(
      collectionApi.endpoints.getCollectionTokensByContractWithAttributes.initiate({
        contract: pathOr('', ['payload', 'contract'])(action),
        attributes: [],
      }),
    )
  },
}
