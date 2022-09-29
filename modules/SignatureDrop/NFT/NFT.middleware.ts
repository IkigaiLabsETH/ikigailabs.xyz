import { ListenerEffectAPI, PayloadAction } from '@reduxjs/toolkit'
import { prop } from 'ramda'

import { AppDispatch, RootState } from '../../../common/redux/store'
import { fetchSignatureDropNFT, fetchSignatureDropNFTMetadata } from './NFT.slice'

export const middleware = {
  actionCreator: fetchSignatureDropNFT,
  effect: (
    action: PayloadAction<{ contract: string; tokenId: string }>,
    listenerApi: ListenerEffectAPI<RootState, AppDispatch>,
  ) => {
    listenerApi.dispatch(fetchSignatureDropNFTMetadata(prop('payload')(action)))
  },
}
