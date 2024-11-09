/* eslint-disable react/function-component-definition */
import Head from 'next/head'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'
import { VoiceProvider } from "@humeai/voice-react"
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { getHumeAccessToken } from '../common/ai'
// import { FREE_MINT_CONTRACT, MINT_PASSES } from '../common/config'

import { withLayout } from '../common/layouts'
import { Layout, NFT, Network, Token } from '../common/types'
// import { Button } from '../modules/Button'
// import { Eyebrow } from '../modules/Eyebrow'
import { Footer } from '../modules/Footer'
// import { FreeMint } from '../modules/FreeMint'
// import { MintPasses } from '../modules/MintPasses'
import { Featured } from '../modules/Featured'
import { SITE_DESCRIPTION, SITE_LOGO_PATH, SITE_TITLE, SITE_URL } from '../common/constants'
import { useAppDispatch, useAppSelector } from '../common/redux/store'
import { collectionTokenApi, selectTokensByContractNetworkAndTokenId } from '../modules/Collection/Token/token.api'
import { FEATURES } from '../common/config'
import { map } from 'ramda'
import { findChainNameByChainId } from '../common/utils'
import { StartCall } from '../modules/StartCall'
import { Controls } from '../modules/Controls'
import { handleToolCallMessage } from '../common/ai/cryptoPriceTool'
// import { selectedNetwork } from '../modules/NetworkSelector'
// import { useAppSelector } from '../common/redux/store'
// import { MintPasses } from '../modules/MintPasses'

const Home: FC = ({
  accessToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const dispatch = useAppDispatch()
  const data = useAppSelector(state => selectTokensByContractNetworkAndTokenId(state, FEATURES))
  const [features, setFeatures] = useState<any[]>([])

  useEffect(() => {
    map(({ contract, network, tokenId }: { contract: string; network: Network; tokenId: string }) => {
      dispatch(collectionTokenApi.endpoints.getTokenByContractAndTokenId.initiate({ contract, tokenId, network }))
    })(FEATURES)
  }, [])

  useEffect(() => {
    if (data.length) {
      const newFeatured = map(
        ({
          token: {
            chainId,
            imageLarge,
            contract,
            tokenId,
            name,
            description,
            collection: { name: collectionName },
          },
        }: NFT) => ({
          image: imageLarge,
          contract,
          tokenId,
          name,
          collectionName,
          description,
          network: findChainNameByChainId(chainId as number),
        }),
      )(data as NFT[])

      setFeatures(newFeatured)
    }
  }, [data])

  return (
    <VoiceProvider
      auth={{ type: "accessToken", value: accessToken }}
      configId="ccb6fd91-52cd-4f8c-bcc5-763f647407b5"
      onToolCall={handleToolCallMessage}
    >
    <div className="flex items-center flex-col">
      <Head>
        <title>{SITE_TITLE}</title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <link rel="icon" href={SITE_LOGO_PATH} />

        <meta name="title" content={SITE_TITLE} />
        <meta name="description" content={SITE_DESCRIPTION} />

        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:title" content={SITE_TITLE} />
        <meta property="og:description" content={SITE_URL} />
        <meta property="og:image" content={SITE_LOGO_PATH} />

        {/* <!-- Twitter --> */}
        <meta property="twitter:card" content={SITE_LOGO_PATH} />
        <meta property="twitter:url" content={SITE_URL} />
        <meta property="twitter:title" content={SITE_TITLE} />
        <meta property="twitter:description" content={SITE_DESCRIPTION} />
        <meta property="twitter:image" content={SITE_LOGO_PATH} />
      </Head>
      <div className="bg-gradient w-full">
        <header className="flex justify-center items-center flex-col py-40">
          <div className="flex flex-grow flex-col justify-center">
            <div className="flex flex-col md:flex-row">
              <div className="md:border-r md:pr-16">
                <h1 className="text-[3rem] md:text-[6rem] font-bold tracking-tighter leading-none text-yellow">
                  Ikigai Labs
                </h1>
                <div className="flex justify-end translate-x-4 -mt-6">
                  <h2 className="text-2xl bg-black text-yellow inline-block leading-none p-2">Powered by ai16z Agent Eliza framework</h2>
                </div>
              </div>
              <div className="mt-4 md:mt-0 md:pl-16 flex justify-center items-center">
                {/* <Image src="/assets/images/IKIGAI_LABS_logo.svg" width="80" height="80" alt="IKIGAI logo" /> */}
                <Controls />
                <StartCall />
              </div>
            </div>
            {/* <div className="mt-10 text-lg justify-center flex items-center">
              <Button className="italic bold text-2xl hover:text-yellow" onClick={() => dispatch(showAllowlist())}>
                Get on the allowlist!
              </Button>
            </div> */}
            {/* <div className="mt-10 text-lg justify-center flex items-center">
              <Button href="https://www.premint.xyz/ikigailabs/" target="_blank">
                Get on allowlist
              </Button>
            </div> */}
          </div>
        </header>
      </div>
      <main className="w-full">
        <div className="w-full bg-white">
          <Featured features={features} />
        </div>
        {/* <FreeMint contract={FREE_MINT_CONTRACT} network={Network.MUMBAI} /> */}
        {/* <MintPasses contracts={MINT_PASSES} /> */}
        {/* <BurnToMint
          sourceContract={pathOr('', ['odessyGenesisCollection', 'sourceContract'])(BURN_TO_MINT)}
          targets={pathOr([], ['odessyGenesisCollection', 'targets'])(BURN_TO_MINT)}
        /> */}
      </main>
      <Footer />
    </div>
    </VoiceProvider>
  )
}

export default withLayout(Layout.main)(Home)

export const getServerSideProps = (async () => {
  // Fetch data from external API
  const accessToken = await getHumeAccessToken()
  // Pass data to the page via props
  return { props: { accessToken } }
}) satisfies GetServerSideProps<{ accessToken: string }>
