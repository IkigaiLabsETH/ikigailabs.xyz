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
import { persistStore, persistReducer, PERSIST } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { createWrapper } from 'next-redux-wrapper'
import { prop } from 'ramda'

import { featuredAuctionReducer } from '../../modules/Auction/Featured'
import { mintPassesReducer } from '../../modules/MintPasses'
import { buyToken, collectionTokenMiddleware, placeBid } from '../../modules/Collection'
import { closeModalMiddleware, modalReducer, openModalMiddleware } from '../../modules/Modal'
import { collectionApi, collectionMiddleware } from '../../modules/Collection'
import { collectionTokenApi } from '../../modules/Collection/Token/token.api'
import { freeMintReducer } from '../../modules/FreeMint'
import { checkTokenBalancesForCollectionMiddleware, burnToMintReducer } from '../../modules/BurnToMint'
import { allowlistApi, signUp } from '../../modules/Allowlist/allowlist.api'
import { walletApi, walletMiddleware } from '../web3'
import { notificationMiddleware } from '../notification'
import { burnToMint } from '../../modules/BurnToMint/burnToMint.slice'
import { claim } from '../../modules/FreeMint/freeMint.slice'
import { collectionsApi } from '../../modules/Collections/collections.api'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { NFTDropsReducer } from '../../modules/NFTDrops'
import { confettiReducer, hideConfettiMiddleware, showConfettiMiddleware } from '../../modules/Confetti'
import { collectionTokenInteractionReducer } from '../../modules/Collection/Token/token.slice'
import { changeNetwork, networkSelectorReducer } from '../../modules/NetworkSelector'
import { dropApi } from '../../modules/Drop/drop.api'
import { mintSuccess } from '../../modules/Drop'
import { closeModalActions, openModalActions } from '../modal'
import { hideConfettiActions, showConfettiActions } from '../confetti'
import { userApi } from '../../modules/User'
import { initialPageLoadMiddleware } from '../app'

export const listenerMiddleware = createListenerMiddleware()

export type AppDispatch = any
export type AppStore = ReturnType<typeof makeStore>
export type RootState = any
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
  [buyToken.fulfilled.type]: 'You have successfully bought your token',
  [buyToken.rejected.type]: 'Token buy failed',
  [placeBid.fulfilled.type]: 'You have successfully made an bid',
  [placeBid.rejected.type]: 'Failed to make an bid',
  'allowlistApi/executeMutation/fulfilled': 'You have successfully signed up',
  'allowlistApi/executeMutation/rejected': 'Failed to sign up',
  [mintSuccess.type]: 'You have successfully minted your token',
}

startAppListening(collectionTokenMiddleware)
startAppListening(collectionMiddleware)
startAppListening(openModalMiddleware(openModalActions as any))
startAppListening(closeModalMiddleware(closeModalActions as any))
startAppListening(checkTokenBalancesForCollectionMiddleware)
startAppListening(
  // @ts-ignore
  notificationMiddleware(notifications)([
    isFulfilled(burnToMint),
    isRejected(burnToMint),
    isFulfilled(claim),
    isRejected(claim),
    isFulfilled(buyToken),
    isRejected(buyToken),
    isFulfilled(placeBid),
    isRejected(placeBid),
    signUp.matchFulfilled,
    signUp.matchRejected,
    mintSuccess,
  ]),
)
startAppListening(walletMiddleware([changeNetwork] as any))
startAppListening(showConfettiMiddleware(showConfettiActions as any))
startAppListening(hideConfettiMiddleware(hideConfettiActions as any))
startAppListening(initialPageLoadMiddleware as any)

const combinedReducer = combineReducers({
  featuredAuction: featuredAuctionReducer,
  mintPasses: mintPassesReducer,
  [collectionTokenApi.reducerPath]: prop('reducer')(collectionTokenApi),
  modal: modalReducer,
  [collectionApi.reducerPath]: prop('reducer')(collectionApi),
  [allowlistApi.reducerPath]: prop('reducer')(allowlistApi),
  [collectionsApi.reducerPath]: prop('reducer')(collectionsApi),
  [dropApi.reducerPath]: prop('reducer')(dropApi),
  collectionTokenInteraction: collectionTokenInteractionReducer,
  freeMint: freeMintReducer,
  burnToMint: burnToMintReducer,
  [walletApi.reducerPath]: prop('reducer')(walletApi),
  NFTDrops: NFTDropsReducer,
  confetti: confettiReducer,
  network: networkSelectorReducer,
  [userApi.reducerPath]: prop('reducer')(userApi),
})

const reducer = (state: ReturnType<typeof combinedReducer>, action: AnyAction) => combinedReducer(state, action)

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['network'],
}

const persistedReducer = persistReducer(persistConfig, reducer)

const makeStore = () =>
  configureStore({
    reducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [PERSIST],
        },
      })
        .prepend(listenerMiddleware.middleware)
        .concat(
          collectionApi.middleware,
          allowlistApi.middleware,
          collectionTokenApi.middleware,
          collectionsApi.middleware,
          walletApi.middleware,
          dropApi.middleware,
          userApi.middleware,
        ),
    devTools: true,
  })

export const store = makeStore()
export const persistor = persistStore(store)
setupListeners(store.dispatch)
export const wrapper = createWrapper<AppStore>(makeStore, { debug: true })
