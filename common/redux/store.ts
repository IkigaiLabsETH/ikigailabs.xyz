import {
  addListener,
  combineReducers,
  configureStore,
  createListenerMiddleware,
  TypedAddListener,
  TypedStartListening,
} from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { prop } from 'ramda'

import { balanceReducer } from '../../modules/Balance'
import { featuredAuctionReducer } from '../../modules/Auction/Featured'
import { featuredDropReducer } from '../../modules/FeaturedDrop'
import { nftDropReducer } from '../../modules/NFTDrop'
import { NFTDropsReducer } from '../../modules/NFTDrops'
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
} from '../../modules/Drop/drop.slice'
import { dropMiddleware } from '../../modules/Drop'

export const listenerMiddleware = createListenerMiddleware()

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export type AppStartListening = TypedStartListening<RootState, AppDispatch>

export const startAppListening = listenerMiddleware.startListening as AppStartListening

export const addAppListener = addListener as TypedAddListener<RootState, AppDispatch>

// startAppListening(NFTDropsMiddleware(web3))
startAppListening(mintPassesMiddleware)
startAppListening(collectionTokenMiddleware)
startAppListening(collectionMiddleware)
startAppListening(dropMiddleware)
startAppListening(modalMiddleware(MODAL_MAPPING)(modalActions))

const store = configureStore({
  reducer: combineReducers({
    balance: balanceReducer,
    featuredAuction: featuredAuctionReducer,
    featuredDrop: featuredDropReducer,
    nftDrop: nftDropReducer,
    NFTDrops: NFTDropsReducer,
    mintPasses: mintPassesReducer,
    [collectionTokenApi.reducerPath]: prop('reducer')(collectionTokenApi),
    modal: modalReducer,
    [collectionApi.reducerPath]: prop('reducer')(collectionApi),
    dropMetadata: metadataReducer,
    dropTokens: tokensReducer,
    dropClaimedSupply: claimedSupplyReducer,
    dropUnclaimedSupply: unclaimedSupplyReducer,
    dropOwnedTokenIds: ownedTokenIdsReducer,
    dropClaimConditions: claimConditionsReducer,
    claims: claimsReducer,
  }),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware).concat(collectionApi.middleware),
  devTools: true,
})

export { store }
