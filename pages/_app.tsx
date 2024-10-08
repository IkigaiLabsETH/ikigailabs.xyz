/* eslint-disable react/jsx-props-no-spreading, react/function-component-definition */
import type { AppProps } from 'next/app'
import { FC, useEffect } from 'react'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/router'
import { ThirdwebProvider } from 'thirdweb/react'

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

const LTLMarketplace: FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter()
  const { query, events, route } = router
  const network = (query?.network as Network) || Network.MAINNET

  const sdkOptions = {}

  if (URLS[network]?.openzeppelin) {
    sdkOptions['gassless'] = {
      openzeppelin: {
        relayerUrl: URLS[network].openzeppelin,
      },
    }
  }

  useEffect(() => {
    events.on('routeChangeStart', (requestedRoute: string) => {
      store.dispatch(changeRoute(requestedRoute))
    })
  }, [events])

  useEffect(() => {
    query && store.dispatch(initialPageLoad(route))
  }, [query, route])
  console.log(pageProps)
  return (
    <Provider store={store}>
        <ThirdwebProvider>
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
