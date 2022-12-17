import { ListenerEffectAPI, PayloadAction } from '@reduxjs/toolkit'
import { prop } from 'ramda'

import { AppDispatch, RootState } from '../../../common/redux/store'
import { fetchDropNFT, fetchDropNFTMetadata } from './token.slice'

export const middleware = {
  actionCreator: fetchDropNFT,
  effect: (
    action: PayloadAction<{ contract: string; tokenId: string }>,
    listenerApi: ListenerEffectAPI<RootState, AppDispatch>,
  ) => {
    listenerApi.dispatch(fetchDropNFTMetadata(prop('payload')(action)))
  },
}
