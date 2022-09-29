import type { AppProps } from 'next/app'
import { FC } from 'react'
import { Provider } from 'react-redux'
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react'

import '../styles/globals.css'
import { store } from '../common/redux'
import { appInit } from '../modules/App/app.reducer'
// import { MainLayout } from '../common/layouts/MainLayout'

const chain = parseInt(process.env.NEXT_CHAIN) || ChainId.Goerli

const LTLMarketplace: FC<AppProps> = ({ Component, pageProps }) => (
  <Provider store={store}>
    <ThirdwebProvider desiredChainId={chain} autoConnect={true}>
        <Component {...pageProps} />
    </ThirdwebProvider>
  </Provider>
)

export default LTLMarketplace

store.dispatch(appInit())
