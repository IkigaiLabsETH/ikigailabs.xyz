/* eslint-disable react/jsx-props-no-spreading, react/function-component-definition */
import type { AppProps } from 'next/app'
import { FC } from 'react'
import { Provider } from 'react-redux'
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react'

import '../styles/globals.css'
import { store } from '../common/redux'
import { appInit } from '../modules/App/app.reducer'
import { Modal } from '../modules/Modal'
import { MODALS } from '../common/modal'

const chain = parseInt(process.env.NEXT_CHAIN, 10) || ChainId.Goerli

const LTLMarketplace: FC<AppProps> = ({ Component, pageProps }) => (
  <Provider store={store}>
    <ThirdwebProvider desiredChainId={chain} autoConnect>
      <Component {...pageProps} />
      <Modal modals={MODALS} />
    </ThirdwebProvider>
  </Provider>
)

export default LTLMarketplace

store.dispatch(appInit())
