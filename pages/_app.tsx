/* eslint-disable react/jsx-props-no-spreading, react/function-component-definition */
import type { AppProps } from 'next/app'
import { FC } from 'react'
import { Provider } from 'react-redux'
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import '../styles/globals.css'
import { store } from '../common/redux'
import { Modal } from '../modules/Modal'
import { MODALS } from '../common/modal'

const chain = parseInt(process.env.NEXT_CHAIN, 10) || ChainId.Goerli

const LTLMarketplace: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <ThirdwebProvider desiredChainId={chain} autoConnect>
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
      </ThirdwebProvider>
    </Provider>
  )
}

export default LTLMarketplace
