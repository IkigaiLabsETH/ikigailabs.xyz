import Head from 'next/head'
import Image from 'next/image'
import { FC } from 'react'

import { FeaturedAuction } from '../modules/Auction/Featured'
import { FeaturedDrops } from '../modules/FeaturedDrops'
import styles from '../styles/Home.module.css'

const Home: FC = () => {
  const featuredMarketplaceContract = process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT
  const featuredListingId = process.env.NEXT_PUBLIC_FEATURED_LISTING_ID
  const walletAddress = process.env.NEXT_PUBLIC_WALLET_ADDRESS

  return (
    <div className={styles.container}>
      <Head>
        <title>LiveTheLifeTV - The future of Photography</title>
        <meta name="description" content="The future of Photography" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className='mt-16 inline-block'>
        <h1 className='text-9xl font-bold tracking-tighter'>Live the life</h1>
        <div className='flex justify-end translate-x-8 -mt-6'>
          <h2 className='text-2xl bg-black text-white inline-block leading-none p-2'>The Future of Photography</h2>
        </div>
      </header>
      <main className={styles.main}>
        <FeaturedAuction contract={featuredMarketplaceContract} listingId={featuredListingId} />
        <FeaturedDrops wallet={walletAddress} contractType="nft-drop" />
      </main>

      <footer className={styles.footer}>
        
      </footer>
    </div>
  )
}

export default Home
