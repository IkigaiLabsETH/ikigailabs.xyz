import Head from 'next/head'
import Image from 'next/image'
import { FC } from 'react'

import { FeaturedAuction } from '../modules/Auction/Featured'
import styles from '../styles/Home.module.css'

const Home: FC = () => {
  const featuredMarketplaceContract = process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT
  const featuredListingId = process.env.NEXT_PUBLIC_FEATURED_LISTING_ID
  return (
    <div className={styles.container}>
      <Head>
        <title>LiveTheLifeTV - The future of Photography</title>
        <meta name="description" content="The future of Photography" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <FeaturedAuction contract={featuredMarketplaceContract} listingId={featuredListingId} />
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home
