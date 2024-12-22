/* eslint-disable react/function-component-definition */
import React, { FC, useEffect, useState, Suspense, startTransition } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import { getHumeAccessToken } from '../common/ai'
import { withLayout } from '../common/layouts'
import { Layout } from '../common/types'
import { SITE_DESCRIPTION, SITE_LOGO_PATH, SITE_TITLE, SITE_URL } from '../common/constants'
import { useAppDispatch, useAppSelector } from '../common/redux/store'
import { collectionTokenApi, selectTokensByContractNetworkAndTokenId } from '../modules/Collection/Token/token.api'
import { FEATURES } from '../common/config'
import { findChainNameByChainId } from '../common/utils'
import { handleToolCallMessage } from '../common/ai/cryptoPriceTool'

interface Collection {
  name: string;
}

interface TokenData {
  chainId: string | number;
  imageLarge: string;
  contract: string;
  tokenId: string;
  name: string;
  description: string;
  collection: Collection;
}

interface NFT {
  token: TokenData;
}

interface Feature {
  image: string;
  contract: string;
  tokenId: string;
  name: string;
  collectionName: string;
  description: string;
  network: string;
}

interface PageContentProps {
  features: Feature[];
}

interface VoiceProviderProps {
  auth: {
    type: "accessToken";
    value: string;
  };
  configId: string;
  onToolCall: (message: any) => void;
  children: React.ReactNode;
}

// Dynamic imports for components
const DynamicVoiceProvider = dynamic<{ children: React.ReactNode; accessToken: string }>(
  () => import("@humeai/voice-react").then(mod => {
    const { VoiceProvider } = mod
    const VoiceProviderWrapper: FC<{ children: React.ReactNode; accessToken: string }> = ({ children, accessToken }) => (
      <VoiceProvider
        auth={{ type: "accessToken", value: accessToken }}
        configId="ccb6fd91-52cd-4f8c-bcc5-763f647407b5"
        onToolCall={handleToolCallMessage}
      >
        {children}
      </VoiceProvider>
    )
    VoiceProviderWrapper.displayName = 'VoiceProviderWrapper'
    return VoiceProviderWrapper
  }),
  { ssr: false }
)

const Controls = dynamic(() => import('../modules/Controls').then(mod => mod.Controls), {
  ssr: false,
  loading: () => <div className="w-[200px] h-[50px] bg-gray-200 animate-pulse rounded" />
})

const StartCall = dynamic(() => import('../modules/StartCall').then(mod => mod.StartCall), {
  ssr: false,
  loading: () => <div className="w-[200px] h-[50px] bg-gray-200 animate-pulse rounded" />
})

const Featured = dynamic(() => import('../modules/Featured').then(mod => mod.Featured), {
  loading: () => <div className="w-full h-[400px] bg-gray-200 animate-pulse rounded" />,
  ssr: true
})

const Metadata = () => (
  <Head>
    <title>{SITE_TITLE}</title>
    <meta name="description" content={SITE_DESCRIPTION} />
    <link rel="icon" href={SITE_LOGO_PATH} />
    <meta name="title" content={SITE_TITLE} />
    <meta name="description" content={SITE_DESCRIPTION} />
    
    {/* Preconnect to critical third-party origins */}
    <link rel="preconnect" href="https://api.hume.ai" />
    <link rel="dns-prefetch" href="https://api.hume.ai" />
    
    {/* Preload critical assets */}
    <link rel="preload" href={SITE_LOGO_PATH} as="image" />
    
    <meta property="og:type" content="website" />
    <meta property="og:url" content={SITE_URL} />
    <meta property="og:title" content={SITE_TITLE} />
    <meta property="og:description" content={SITE_URL} />
    <meta property="og:image" content={SITE_LOGO_PATH} />
    <meta property="twitter:card" content={SITE_LOGO_PATH} />
    <meta property="twitter:url" content={SITE_URL} />
    <meta property="twitter:title" content={SITE_TITLE} />
    <meta property="twitter:description" content={SITE_DESCRIPTION} />
    <meta property="twitter:image" content={SITE_LOGO_PATH} />
  </Head>
)

const PageContent: FC<PageContentProps> = ({ features }) => (
  <div className="flex items-center flex-col">
    <Metadata />
    <div className="bg-gradient w-full">
      <header className="flex justify-center items-center flex-col py-40">
        <div className="flex flex-grow flex-col justify-center">
          <div className="flex flex-col md:flex-row">
            <div className="md:border-r md:pr-16">
              <h1 className="text-[3rem] md:text-[6rem] font-bold tracking-tighter leading-none text-yellow">
                Ikigai Labs
              </h1>
              <div className="flex justify-end translate-x-4 -mt-6">
                <h2 className="text-2xl bg-black text-yellow inline-block leading-none p-2">
                  Hypermedia & Autonomous Agents
                </h2>
              </div>
            </div>
            <div className="mt-4 md:mt-0 md:pl-16 flex justify-center items-center">
              <Suspense fallback={
                <div className="w-[400px] h-[100px] bg-gray-200 animate-pulse rounded flex space-x-4">
                  <div className="w-1/2 bg-gray-300 rounded" />
                  <div className="w-1/2 bg-gray-300 rounded" />
                </div>
              }>
                <Controls />
                <StartCall />
              </Suspense>
            </div>
          </div>
        </div>
      </header>
    </div>
    <main className="w-full">
      <div className="w-full bg-white">
        <Suspense fallback={
          <div className="w-full h-[400px] bg-gray-200 animate-pulse rounded grid grid-cols-3 gap-4 p-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-300 rounded aspect-square" />
            ))}
          </div>
        }>
          <Featured features={features} />
        </Suspense>
      </div>
    </main>
  </div>
)

interface HomeProps extends Record<string, unknown> {
  accessToken: string;
  initialFeatures: Feature[];
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  try {
    const accessToken = await getHumeAccessToken() || ''
    const initialFeatures: Feature[] = []  // Empty array for initial SSR
    
    return {
      props: {
        accessToken,
        initialFeatures,
      },
    }
  } catch (error) {
    console.error('Error in getServerSideProps:', error)
    return {
      props: {
        accessToken: '',
        initialFeatures: [],
      },
    }
  }
}

const HomeComponent = ({ accessToken, initialFeatures }: HomeProps) => {
  const dispatch = useAppDispatch()
  const [features, setFeatures] = useState<Feature[]>(initialFeatures)
  const data = useAppSelector(state => selectTokensByContractNetworkAndTokenId(state, FEATURES))
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const promises = FEATURES.map(({ contract, network, tokenId }) => 
        dispatch(collectionTokenApi.endpoints.getTokenByContractAndTokenId.initiate({ contract, tokenId, network }))
      )
      await Promise.all(promises)
    }
    
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [dispatch])

  useEffect(() => {
    if (data.length) {
      startTransition(() => {
        const newFeatured = (data as NFT[]).map(({
          token: {
            chainId,
            imageLarge,
            contract,
            tokenId,
            name,
            description,
            collection: { name: collectionName },
          },
        }) => {
          const network = findChainNameByChainId(chainId as number)
          if (typeof network !== 'string') {
            throw new Error(`Invalid network for chainId: ${chainId}`)
          }
          return {
            image: imageLarge,
            contract,
            tokenId,
            name,
            collectionName,
            description,
            network,
          } as Feature
        })
        setFeatures(newFeatured)
      })
    }
  }, [data])

  if (!mounted) {
    return <PageContent features={features} />
  }

  return (
    <DynamicVoiceProvider accessToken={accessToken}>
      <PageContent features={features} />
    </DynamicVoiceProvider>
  )
}

const Home = withLayout(Layout.main)(HomeComponent)
export default Home
