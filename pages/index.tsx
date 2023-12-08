/* eslint-disable react/function-component-definition */
import Head from 'next/head'
import Image from 'next/image'
import { FC } from 'react'
import { FREE_MINT_CONTRACT, MINT_PASSES } from '../common/config'

import { withLayout } from '../common/layouts/MainLayout/withLayout'
import { Layout, Network } from '../common/types'
import { Button } from '../modules/Button'
import { Eyebrow } from '../modules/Eyebrow'
import { Footer } from '../modules/Footer'
import { FreeMint } from '../modules/FreeMint'
import { MintPasses } from '../modules/MintPasses'
// import { selectedNetwork } from '../modules/NetworkSelector'
// import { useAppSelector } from '../common/redux/store'
// import { MintPasses } from '../modules/MintPasses'

const Home: FC = () => {
  return (
    <div className="flex items-center flex-col">
      <Head>
        <title>Ikigai Labs - Shaped by Photography</title>
        <meta name="description" content="Shaped by Photography" />
        <link rel="icon" href="/assets/images/IKIGAI_LABS_logo.svg" />
      </Head>
      <header className="flex h-screen justify-center items-center flex-col">
        <div className="flex flex-grow flex-col justify-center">
          <div className="flex flex-col md:flex-row">
            <div className="md:border-r md:pr-16">
              <h1 className="text-[3rem] md:text-[6rem] font-bold tracking-tighter leading-none text-yellow">
                Ikigai Labs
              </h1>
              <div className="flex justify-end translate-x-4 -mt-6">
                <h2 className="text-2xl bg-black text-yellow inline-block leading-none p-2">Shaped by Photography</h2>
              </div>
            </div>
            <div className="mt-4 md:mt-0 md:pl-16 flex justify-center items-center">
              <Image src="/assets/images/IKIGAI_LABS_logo.svg" width="80" height="80" alt="IKIGAI logo" />
            </div>
          </div>
          {/* <div className="mt-10 text-lg justify-center flex items-center">
            <Button className="italic bold text-2xl hover:text-yellow" onClick={() => dispatch(showAllowlist())}>
              Get on the allowlist!
            </Button>
          </div> */}
          <div className="mt-10 text-lg justify-center flex items-center">
            <Button href="https://www.premint.xyz/ikigailabs/" target="_blank">
              Get on allowlist
            </Button>
          </div>
        </div>
        <div className="pb-10 flex justify-center items-center flex-col">
          <Eyebrow>Free mint</Eyebrow>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-12 h-12"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </header>
      <main className="w-full">
        <FreeMint contract={FREE_MINT_CONTRACT} network={Network.MUMBAI} />
        <MintPasses contracts={MINT_PASSES} />
        {/* <BurnToMint
          sourceContract={pathOr('', ['odessyGenesisCollection', 'sourceContract'])(BURN_TO_MINT)}
          targets={pathOr([], ['odessyGenesisCollection', 'targets'])(BURN_TO_MINT)}
        /> */}
      </main>
      <Footer />
    </div>
  )
}

export default withLayout(Layout.main)(Home)
