import { ListenerEffectAPI, PayloadAction } from '@reduxjs/toolkit'
import { prop } from 'ramda'

import { AppDispatch, RootState } from '../../../common/redux/store'
import { fetchCollectionNFT, fetchCollectionNFTMetadata } from './NFT.slice'

export const middleware = {
  actionCreator: fetchCollectionNFT,
  effect: (
    action: PayloadAction<{ contract: string; tokenId: string }>,
    listenerApi: ListenerEffectAPI<RootState, AppDispatch>,
  ) => {
    listenerApi.dispatch(fetchCollectionNFTMetadata(prop('payload')(action)))
  },
}
