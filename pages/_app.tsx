/* eslint-disable react/jsx-props-no-spreading, react/function-component-definition */
import type { AppProps } from 'next/app'
import { FC, useEffect } from 'react'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/router'
import { ThirdwebProvider } from '@thirdweb-dev/react'

import '../styles/globals.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { store } from '../common/redux'
import { Modal } from '../modules/Modal'
import { MODALS } from '../common/modal'
import { Confetti } from '../modules/Confetti'
import { Network } from '../common/types'
import { changeRoute, initialPageLoad } from '../common/app'
import { URLS } from '../common/config'
import { SlideUp } from '../modules/SlideUp'
import { SLIDEUPS } from '../common/slideup'

interface NetworkConfig {
  reservoir: string
  tw: string
  alchemy: string
  explorer: string
  openzeppelin?: string
}

type URLSType = {
  [key in Network]?: NetworkConfig
}

const LTLMarketplace: FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter()
  const { query, events, route } = router
  const network = (query?.network as Network) || Network.MAINNET

  const sdkOptions: Record<string, any> = {}

  const networkConfig = (URLS as URLSType)[network]
  if (networkConfig?.openzeppelin) {
    sdkOptions.gasless = {
      openzeppelin: {
        relayerUrl: networkConfig.openzeppelin,
      },
    }
  }

  useEffect(() => {
    const handleRouteChange = (requestedRoute: string) => {
      store.dispatch(changeRoute(requestedRoute))
    }

    events.on('routeChangeStart', handleRouteChange)

    return () => {
      events.off('routeChangeStart', handleRouteChange)
    }
  }, [events])

  useEffect(() => {
    if (query) {
      store.dispatch(initialPageLoad(route))
    }
  }, [query, route])

  return (
    <Provider store={store}>
      <ThirdwebProvider
        clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
        activeChain="ethereum"
        sdkOptions={sdkOptions}
      >
        <Component {...pageProps} />
        <Modal modals={MODALS} />
        <SlideUp slideUps={SLIDEUPS} />
        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Confetti />
      </ThirdwebProvider>
    </Provider>
  )
}

export default LTLMarketplace
