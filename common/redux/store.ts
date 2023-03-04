import {
  addListener,
  AnyAction,
  combineReducers,
  configureStore,
  createListenerMiddleware,
  isFulfilled,
  isRejected,
  TypedAddListener,
  TypedStartListening,
} from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import {createWrapper, Context, HYDRATE} from 'next-redux-wrapper';
import { prop } from 'ramda'

import { balanceReducer } from '../../modules/Balance'
import { featuredAuctionReducer } from '../../modules/Auction/Featured'
import { featuredDropReducer } from '../../modules/FeaturedDrop'
import { mintPassesReducer, mintPassesMiddleware } from '../../modules/MintPasses'
import { collectionTokenMiddleware } from '../../modules/Collection/Token'
import { modalMiddleware, modalReducer } from '../../modules/Modal'
import { modalActions, MODAL_MAPPING } from '../modal'
import { collectionApi, collectionMiddleware } from '../../modules/Collection'
import { collectionTokenApi } from '../../modules/Collection/Token/token.api'
import {
  claimConditionsReducer,
  claimedSupplyReducer,
  claimsReducer,
  metadataReducer,
  ownedTokenIdsReducer,
  tokensReducer,
  unclaimedSupplyReducer,
} from '../../modules/Drop'
import { dropMiddleware } from '../../modules/Drop'
import { freeMintMiddleware, freeMintReducer } from '../../modules/FreeMint'
import {
  checkTokenBalancesForCollectionMiddleware,
  burnToMintReducer,
  getTokenBalanceSuccessMiddleware,
} from '../../modules/BurnToMint'
import { allowlistApi, signUp } from '../../modules/Allowlist/allowlist.api'
import { tokenBalanceReducer } from '../web3'
import { notificationMiddleware } from '../notification'
import { burnToMint } from '../../modules/BurnToMint/burnToMint.slice'
import { claim } from '../../modules/FreeMint/freeMint.slice'
import { collectionsApi } from '../../modules/Collections/collections.api'
import { setupListeners } from '@reduxjs/toolkit/dist/query';

export const listenerMiddleware = createListenerMiddleware()

export type AppDispatch = typeof store.dispatch
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export type AppStartListening = TypedStartListening<RootState, AppDispatch>

export const startAppListening = listenerMiddleware.startListening as AppStartListening

export const addAppListener = addListener as TypedAddListener<RootState, AppDispatch>

const notifications = {
  [burnToMint.fulfilled.type]: 'You have successfully swapped your tokens',
  [burnToMint.rejected.type]: 'Failed to burn token',
  [claim.fulfilled.type]: 'You have successfully claimed your token',
  [claim.rejected.type]: 'Failed to claim token',
  'allowlistApi/executeMutation/fulfilled': 'You have successfully signed up',
  'allowlistApi/executeMutation/rejected': 'Failed to sign up',
}

// startAppListening(NFTDropsMiddleware(web3))
startAppListening(mintPassesMiddleware)
startAppListening(collectionTokenMiddleware)
startAppListening(collectionMiddleware)
startAppListening(dropMiddleware)
startAppListening(modalMiddleware(MODAL_MAPPING)(modalActions as any))
startAppListening(freeMintMiddleware)
startAppListening(checkTokenBalancesForCollectionMiddleware)
startAppListening(getTokenBalanceSuccessMiddleware)
startAppListening(
  notificationMiddleware(notifications)([
    isFulfilled(burnToMint),
    isRejected(burnToMint),
    isFulfilled(claim),
    isRejected(claim),
    signUp.matchFulfilled,
    signUp.matchRejected,
  ]),
)

const combinedReducer = combineReducers({
  balance: balanceReducer,
  featuredAuction: featuredAuctionReducer,
  featuredDrop: featuredDropReducer,
  mintPasses: mintPassesReducer,
  [collectionTokenApi.reducerPath]: prop('reducer')(collectionTokenApi),
  modal: modalReducer,
  [collectionApi.reducerPath]: prop('reducer')(collectionApi),
  [allowlistApi.reducerPath]: prop('reducer')(allowlistApi),
  [collectionsApi.reducerPath]: prop('reducer')(collectionsApi),
  dropMetadata: metadataReducer,
  dropTokens: tokensReducer,
  dropClaimedSupply: claimedSupplyReducer,
  dropUnclaimedSupply: unclaimedSupplyReducer,
  dropOwnedTokenIds: ownedTokenIdsReducer,
  dropClaimConditions: claimConditionsReducer,
  claims: claimsReducer,
  freeMint: freeMintReducer,
  burnToMint: burnToMintReducer,
  tokenBalance: tokenBalanceReducer,
})

const reducer = (state: ReturnType<typeof combinedReducer>, action: AnyAction) => combinedReducer(state, action)

const makeStore = () => configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .prepend(listenerMiddleware.middleware)
      .concat(
        collectionApi.middleware,
        allowlistApi.middleware,
        collectionTokenApi.middleware,
        collectionsApi.middleware,
      ),
  devTools: true,
})

export const store = makeStore()
setupListeners(store.dispatch)
export const wrapper = createWrapper<AppStore>(makeStore, {debug: true});
