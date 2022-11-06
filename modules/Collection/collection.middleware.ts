import { ListenerEffectAPI, PayloadAction } from '@reduxjs/toolkit'
import { pathOr, prop } from 'ramda'

import { AppDispatch, RootState } from '../../common/redux/store'
import { collectionActivityApi } from './activity/collectionActivity.api'
import {
  fetchCollection,
  fetchCollectionMetadata,
  fetchCollectionNFTs,
  fetchCollectionClaimedSupply,
  fetchCollectionUnclaimedSupply,
  fetchCollectionClaimConditions,
} from './collection.slice'

export const middleware = {
  actionCreator: fetchCollection,
  effect: (action: PayloadAction<{ contract: string }>, listenerApi: ListenerEffectAPI<RootState, AppDispatch>) => {
    listenerApi.dispatch(fetchCollectionMetadata(prop('payload')(action)))
    listenerApi.dispatch(fetchCollectionNFTs(prop('payload')(action)))
    listenerApi.dispatch(fetchCollectionClaimedSupply(prop('payload')(action)))
    listenerApi.dispatch(fetchCollectionUnclaimedSupply(prop('payload')(action)))
    listenerApi.dispatch(fetchCollectionClaimConditions(prop('payload')(action)))
    listenerApi.dispatch(collectionActivityApi.endpoints.getCollectionActivityByContract.initiate(pathOr('', ['payload', 'contract'])(action)))
  },
}
