import { ListenerEffectAPI, PayloadAction } from '@reduxjs/toolkit'
import { prop } from 'ramda'

import { AppDispatch, RootState } from '../../common/redux/store'
import {
  fetchSignatureDrop,
  fetchSignatureDropMetadata,
  fetchSignatureDropNFTs,
  fetchSignatureDropClaimedSupply,
  fetchSignatureDropUnclaimedSupply,
  fetchSignatureDropClaimConditions,
} from './SignatureDrop.slice'

export const middleware = {
  actionCreator: fetchSignatureDrop,
  effect: (action: PayloadAction<{ contract: string }>, listenerApi: ListenerEffectAPI<RootState, AppDispatch>) => {
    listenerApi.dispatch(fetchSignatureDropMetadata(prop('payload')(action)))
    listenerApi.dispatch(fetchSignatureDropNFTs(prop('payload')(action)))
    listenerApi.dispatch(fetchSignatureDropClaimedSupply(prop('payload')(action)))
    listenerApi.dispatch(fetchSignatureDropUnclaimedSupply(prop('payload')(action)))
    listenerApi.dispatch(fetchSignatureDropClaimConditions(prop('payload')(action)))
  },
}
