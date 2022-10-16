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
import { mintPassesReducer, mintPassesMiddleware, MintPasses } from '../../modules/MintPasses'
import { signatureDropMiddleware, signatureDropReducer } from '../../modules/SignatureDrop'
import { signatureDropNFTMiddleware, signatureDropNFTReducer } from '../../modules/SignatureDrop/NFT'
import { modalMiddleware, modalReducer } from '../../modules/Modal'
import { showMintPassDetails } from '../../modules/MintPasses/mintPasses.slice'
import { appInit } from '../../modules/App/app.reducer'
import { modalActions, MODAL_MAPPING } from '../modal'

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
startAppListening(modalMiddleware(MODAL_MAPPING)(modalActions))

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
    modal: modalReducer,
  }),
  devTools: true,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(listenerMiddleware.middleware),
})

export { store }
