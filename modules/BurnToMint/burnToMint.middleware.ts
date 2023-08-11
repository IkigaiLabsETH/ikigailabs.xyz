import { ListenerEffectAPI, PayloadAction, isFulfilled } from '@reduxjs/toolkit'
import { map } from 'ramda'

import { AppDispatch, RootState } from '../../common/redux/store'
import { getTokenBalance } from '../../common/web3/wallet.api'
import { collectionTokenApi } from '../Collection/Token/token.api'
import { checkTokenBalancesForCollection } from './burnToMint.slice'

export const checkTokenBalancesForCollectionMiddleware = {
  actionCreator: checkTokenBalancesForCollection,
  effect: (
    action: PayloadAction<{
      collection: {
        contract: string
        tokenIds: string[]
      }
      address: string
    }>,
    listenerApi: ListenerEffectAPI<RootState, AppDispatch>,
  ) => {
    const {
      address,
      collection: { contract, tokenIds },
    } = action.payload
    map((tokenId: string) => listenerApi.dispatch(getTokenBalance.initiate({ contract, tokenId, address })))(tokenIds)
  },
}

export const getTokenBalanceSuccessMiddleware = {
  actionCreator: isFulfilled(getTokenBalance),
  effect: (action: any, listenerApi: ListenerEffectAPI<RootState, AppDispatch>) => {
    const {
      payload,
      meta: {
        arg: { contract, tokenId, network },
      },
    } = action
    if (payload > 0) {
      listenerApi.dispatch(
        collectionTokenApi.endpoints.getTokenByContractAndTokenId.initiate({ contract, tokenId, network }),
      )
    }
  },
}
