import { ListenerEffectAPI, PayloadAction } from '@reduxjs/toolkit'
import { prop } from 'ramda'

import { AppDispatch, RootState } from '../../../common/redux/store'

// export const middleware = {
//   actionCreator: fetchDropNFT,
//   effect: (
//     action: PayloadAction<{ contract: string; tokenId: string }>,
//     listenerApi: ListenerEffectAPI<RootState, AppDispatch>,
//   ) => {
//     console.log('middleware', action)
//     listenerApi.dispatch(fetchDropNFTMetadata(prop('payload')(action)))
//   },
// }
