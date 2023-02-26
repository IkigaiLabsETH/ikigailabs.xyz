/* eslint-disable react/function-component-definition */
import Head from 'next/head'
import Image from 'next/image'
import { FC } from 'react'
import { FREE_MINT_CONTRACT, FREE_MINT_TOKEN_ID } from '../common/config'

import { withLayout } from '../common/layouts/MainLayout/withLayout'
import { useAppDispatch } from '../common/redux/store'
import { Layout } from '../common/types'
import { Eyebrow } from '../modules/Eyebrow'
import { Footer } from '../modules/Footer'
import { FreeMint } from '../modules/FreeMint'

const Home: FC = () => {
  const dispatch = useAppDispatch()

  return (
    <div className="flex items-center flex-col">
      <Head>
        <title>LiveTheLifeTV - The future of Photography</title>
        <meta name="description" content="The future of Photography" />
        <link rel="icon" href="/assets/images/ltl-logo-white-small.png" />
      </Head>
      <header className="flex h-screen justify-center items-center flex-col">
        <div className="flex flex-grow flex-col justify-center">
          <div className="flex flex-col md:flex-row">
            <div className="md:border-r md:pr-16">
              <h1 className="text-[3rem] md:text-[6rem] font-bold tracking-tighter leading-none">Live the life</h1>
              <div className="flex justify-end translate-x-4 -mt-6">
                <h2 className="text-2xl bg-black text-white inline-block leading-none p-2">
                  The Future of Photography
                </h2>
              </div>
            </div>
            <div className="mt-4 md:mt-0 md:pl-16 flex justify-center items-center">
              <Image src="/assets/images/ltl-logo-white-small.png" width="80px" height="80px" />
            </div>
          </div>
          {/* <div className="mt-10 text-lg justify-center flex items-center">
            <Button className="italic bold text-2xl hover:text-yellow" onClick={() => dispatch(showAllowlist())}>
              Get on the allowlist!
            </Button>
          </div> */}
        </div>
        <div className="pb-10 flex justify-center items-center flex-col">
          <Eyebrow>NFT Paris Free mint</Eyebrow>
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
        <FreeMint contract={FREE_MINT_CONTRACT} tokenId={FREE_MINT_TOKEN_ID} />
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
