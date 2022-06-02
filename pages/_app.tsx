import type { AppProps } from 'next/app'
import { FC } from 'react'
import { Provider } from 'react-redux'
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react'

import '../styles/globals.css'
import { store } from '../common/redux'
import { MainLayout } from '../common/layouts/mainLayout'

const chain = parseInt(process.env.NEXT_CHAIN) || ChainId.Rinkeby

const LTLMarketplace: FC<AppProps> = ({ Component, pageProps }) => (
  <Provider store={store}>
    <ThirdwebProvider desiredChainId={chain}>
      <MainLayout>
       <Component {...pageProps} />
      </MainLayout>
    </ThirdwebProvider>
  </Provider>
)

export default LTLMarketplace
