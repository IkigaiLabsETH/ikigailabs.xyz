/* eslint-disable react/jsx-props-no-spreading, react/function-component-definition */
import type { AppProps } from 'next/app'
import { FC, useEffect } from 'react'
import { Provider } from 'react-redux'
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { PersistGate } from 'redux-persist/integration/react'

import '../styles/globals.css'

import { store } from '../common/redux'
import { Modal } from '../modules/Modal'
import { MODALS } from '../common/modal'
import { Confetti } from '../modules/Confetti'
import { persistor } from '../common/redux/store'
import { Network } from '../common/types'
import { changeRoute } from '../common/app'

const LTLMarketplace: FC<AppProps> = ({ Component, pageProps }) => {
  let network = store.getState().network.selectedNetwork
  const { query, events } = useRouter()

  if (query.network) {
    network = query.network as Network
  }

  useEffect(() => {
    events.on('routeChangeStart', (requestedRoute: string) => {
      console.log(requestedRoute)
      store.dispatch(changeRoute(requestedRoute))
    })
  }, [events])

  const queryClient = new QueryClient()
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <ThirdwebProvider activeChain={ChainId[network]} queryClient={queryClient} autoConnect>
            <Component {...pageProps} />
            <Modal modals={MODALS} />
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
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  )
}

export default LTLMarketplace
