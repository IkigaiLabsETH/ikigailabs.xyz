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
import { mintPassesReducer, mintPassesMiddleware } from '../../modules/MintPasses'
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
startAppListening(mintPassesMiddleware)
startAppListening(signatureDropMiddleware)
startAppListening(signatureDropNFTMiddleware)

const store = configureStore({
  reducer: combineReducers({
    balance: balanceReducer,
    featuredAuction: featuredAuctionReducer,
    featuredDrop: featuredDropReducer,
    nftDrop: nftDropReducer,
    NFTDrops: NFTDropsReducer,
    mintPasses: mintPassesReducer,
    signatureDrop: signatureDropReducer,
    signatureNFT: signatureDropNFTReducer,
  }),
  devTools: true,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(listenerMiddleware.middleware),
})

export { store }
