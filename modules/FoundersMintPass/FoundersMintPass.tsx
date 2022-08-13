import Link from 'next/link'
import React, { FC } from 'react'

export const FoundersMintPass: FC = () => (
  <div className='flex flex-row space-x-6 my-32'>
    <div className=''>
      <h1 className='mb-6'>Founders Mint Pass</h1>
      <p>
        LiveTheLifeTV is a curatorial platform and community that helps bring incredible works of photography to
        discerning collectors. The Founders Mint Pass acts as an access card to our community of digital artists and
        collectors as well as its exclusive events, including art and cultural trips, private auctions, gallery openings,
        and artist dinners. It unlocks priority mints from our roster of iconic and emerging artists! NFT is the product.{' '}
      </p>

      <div className='flex flex-row mt-16'>
        <div>
          <h2>Founders mint pass</h2>
          <button className='w-full mt-6 leading-loose bg-red p-1 font-bold tracking-tighter'>
            Join Allowlist
          </button>
        </div>
        <div className='p-8 pt-0'>
          <ul className="leading-loose">
            <li>Holders of The Founders Mint Pass NFTs have allowlist access to all our drops.</li>
            <li>Free gift of our upcoming limited edition LiveTheLifeTV Merch &amp; Print</li>
            <li>Access to Founders Mint Pass raffle giveaways on the LiveTheLifeTV Discord.</li>
            <li>Access to Collectors Club Discord channel only for Founders Mint Pass owners.</li>
            <li>Discount at all current, future, and affiliate LiveTheLifeTV co-work locations.</li>
            <li>Access to exclusive experiences, one example is our photogrammetry workshop.</li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <p className='my-4 text-xl'>The Metaverse is the digital customer experience.</p>
        <ul className='flex flex-row space-x-5'>
          <li><Link href=""><a className='leading-loose bg-red p-1 font-bold tracking-tighter'>Spatial</a></Link></li>
          <li><Link href=""><a className='leading-loose bg-red p-1 font-bold tracking-tighter'>oncyber</a></Link></li>
        </ul>
      </div>
    </div>
    <div>
      <video controlsList="nodownload" poster="https://openseauserdata.com/files/c0272ec89d3bd2e950c5de4ea4aba9d3.jpg" preload="metadata"><source src="https://openseauserdata.com/files/a5571cf9ab8fe256ad77ea34b8fe6a05.mp4#t=0.001" type="video/mp4"/></video>
    </div>
  </div>
)
