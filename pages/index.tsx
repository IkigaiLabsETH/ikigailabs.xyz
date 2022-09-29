import Head from 'next/head'
import Image from 'next/image'
import { FC } from 'react'

import { FEATURED_DROP, FREE_MINT_CONTRACT, FREE_MINT_TOKEN_ID } from '../common/config'
import { FeaturedAuction } from '../modules/Auction/Featured'
import { FeaturedDrop } from '../modules/FeaturedDrop'
import { Footer } from '../modules/Footer'
import { FoundersMintPass } from '../modules/FoundersMintPass'
import { FreeMint } from '../modules/FreeMint'
import { NFTDrops } from '../modules/NFTDrops'

const Home: FC = () => {
  const featuredMarketplaceContract = process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT
  const featuredListingId = process.env.NEXT_PUBLIC_FEATURED_LISTING_ID

  return (
    <div className="flex items-center flex-col">
      <Head>
        <title>LiveTheLifeTV - The future of Photography</title>
        <meta name="description" content="The future of Photography" />
        <link rel="icon" href="/assets/images/ltl-logo-white-small.png" />
      </Head>
      <header className="h-screen flex justify-center items-center flex-col">
        <div className="flex flex-col md:flex-row">
          <div className="md:border-r md:pr-16">
            <h1 className="text-[3rem] md:text-[6rem] font-bold tracking-tighter leading-none">Live the life</h1>
            <div className="flex justify-end translate-x-4 -mt-6">
              <h2 className="text-2xl bg-black text-white inline-block leading-none p-2">The Future of Photography</h2>
            </div>
          </div>
          <div className="mt-4 md:mt-0 md:pl-16 flex justify-center items-center">
            <Image src="/assets/images/ltl-logo-white-small.png" width="80px" height="80px" />
          </div>
        </div>
      </header>
      <main className="w-full">
        {/* <FeaturedAuction contract={featuredMarketplaceContract} listingId={featuredListingId} /> */}
        <FeaturedDrop contract={FEATURED_DROP} />
        {/* <NFTDrops /> */}
        <FoundersMintPass />
        <FreeMint contract={FREE_MINT_CONTRACT} tokenId={FREE_MINT_TOKEN_ID} />
      </main>
      <Footer />
    </div>
  )
}

export default Home
