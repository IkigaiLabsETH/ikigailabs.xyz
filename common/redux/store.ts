import {
  addListener,
  combineReducers,
  configureStore,
  createListenerMiddleware,
  TypedAddListener,
  TypedStartListening,
} from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { balanceReducer } from '../../modules/Balance'
import { featuredAuctionReducer } from '../../modules/Auction/Featured'
import { featuredDropReducer } from '../../modules/FeaturedDrop'
import { nftDropReducer } from '../../modules/NFTDrop'
import { NFTDropsReducer } from '../../modules/NFTDrops'
import { NFTDropsMiddleware } from '../../modules/NFTDrops'
import { foundersMintPassReducer } from '../../modules/FoundersMintPass'
import { freeMintReducer, freeMintMiddleware } from '../../modules/FreeMint'
import { web3 } from '../web3'
import { signatureDropMiddleware, signatureDropReducer } from '../../modules/SignatureDrop'
import { signatureDropNFTMiddleware, signatureDropNFTReducer } from '../../modules/SignatureDrop/NFT'

export const listenerMiddleware = createListenerMiddleware()

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export type AppStartListening = TypedStartListening<RootState, AppDispatch>

export const startAppListening = listenerMiddleware.startListening as AppStartListening

export const addAppListener = addListener as TypedAddListener<RootState, AppDispatch>

// startAppListening(NFTDropsMiddleware(web3))
startAppListening(freeMintMiddleware(web3))
startAppListening(signatureDropMiddleware)
startAppListening(signatureDropNFTMiddleware)

const store = configureStore({
  reducer: combineReducers({
    balance: balanceReducer,
    featuredAuction: featuredAuctionReducer,
    featuredDrop: featuredDropReducer,
    nftDrop: nftDropReducer,
    NFTDrops: NFTDropsReducer,
    mintPass: foundersMintPassReducer,
    freeMint: freeMintReducer,
    signatureDrop: signatureDropReducer,
    signatureNFT: signatureDropNFTReducer,
  }),
  devTools: true,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(listenerMiddleware.middleware),
})

export { store }
