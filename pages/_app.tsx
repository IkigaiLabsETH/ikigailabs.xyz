import type { AppProps } from 'next/app'
import { FC } from 'react'
import { Provider } from 'react-redux'

import '../styles/globals.css'
import { store } from '../common/redux'

const LTLMarketplace: FC<AppProps> = ({ Component, pageProps }) => (
  <Provider store={store}>
    <Component {...pageProps} />
  </Provider>
)

export default LTLMarketplace
