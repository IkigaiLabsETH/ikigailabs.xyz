import { ListenerEffectAPI, PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from '../redux'
import { changeNetwork } from '../../modules/NetworkSelector'
import { Network } from '../types'
import { initialPageLoad } from './app.action'
import { includes } from 'ramda'

export const initialPageLoadMiddleware = {
  actionCreator: initialPageLoad,
  effect: (action: PayloadAction<string>, listenerApi: ListenerEffectAPI<RootState, AppDispatch>) => {
    if (action.payload.includes('[network]')) {
      const network = window.location.pathname.split('/')[1]
      listenerApi.dispatch(changeNetwork({ network: network as Network }))
    }
  },
}
