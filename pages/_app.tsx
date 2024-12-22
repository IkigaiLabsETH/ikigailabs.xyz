/* eslint-disable react/jsx-props-no-spreading, react/function-component-definition */
'use client'

import type { AppProps } from 'next/app'
import { useState, useEffect } from 'react'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/router'
import { ThirdwebProvider } from '@thirdweb-dev/react'
import { metamaskWallet, coinbaseWallet, walletConnect } from "@thirdweb-dev/react"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

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
import { getChainIdFromNetwork } from '../common/utils'

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

interface DappMetadata {
  name: string
  url: string
  isDarkMode: boolean
  gasless?: {
    openzeppelin: {
      relayerUrl: string
    }
  }
}

interface SDKOptions {
  dappMetadata: DappMetadata
  readonlySettings: {
    rpcUrl: string
    chainId: number
  }
}

export default function LTLMarketplace({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const { query, events, route } = router
  const network = (query?.network as Network) || Network.MAINNET

  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 60 * 1000,
        retry: 1,
        enabled: typeof window !== 'undefined',
      },
    },
  }))

  const sdkOptions: SDKOptions = {
    dappMetadata: {
      name: "IkigaiLabs",
      url: process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000",
      isDarkMode: true,
    },
    readonlySettings: {
      rpcUrl: process.env.NEXT_PUBLIC_RPC_URL || "https://rpc.ankr.com/eth",
      chainId: getChainIdFromNetwork(Network.MAINNET),
    }
  }

  const networkConfig = (URLS as URLSType)[network]
  if (networkConfig?.openzeppelin) {
    sdkOptions.dappMetadata.gasless = {
      openzeppelin: {
        relayerUrl: networkConfig.openzeppelin,
      },
    }
  }

  // Handle route changes
  useEffect(() => {
    const handleRouteChange = (requestedRoute: string) => {
      store.dispatch(changeRoute(requestedRoute))
    }

    events.on('routeChangeStart', handleRouteChange)
    return () => events.off('routeChangeStart', handleRouteChange)
  }, [events])

  // Handle initial page load
  useEffect(() => {
    if (query) {
      store.dispatch(initialPageLoad(route))
    }
  }, [query, route])

  // Handle client-side mounting
  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent hydration issues by rendering nothing on server
  if (!mounted) {
    return null
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThirdwebProvider
        clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
        activeChain={getChainIdFromNetwork(Network.MAINNET)}
        sdkOptions={sdkOptions}
        supportedWallets={[
          metamaskWallet({ recommended: true }),
          coinbaseWallet(),
          walletConnect()
        ]}
        authConfig={{
          domain: process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN || "http://localhost:3000",
          authUrl: "/api/auth",
        }}
      >
        <Provider store={store}>
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
        </Provider>
      </ThirdwebProvider>
    </QueryClientProvider>
  )
}
