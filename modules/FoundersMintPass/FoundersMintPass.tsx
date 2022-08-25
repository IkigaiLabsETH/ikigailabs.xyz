import React, { FC } from 'react'
import { Button } from '../Button'
import { Link } from '../Link'

export const FoundersMintPass: FC = () => (
  <div className='flex flex-col p-48 bg-white text-black'>
    <div className='flex flex-row space-x-6 mt-32'>
      <div className='w-2/3'>
        <h1 className='mb-6 text-[5rem]'>Founders Mint Pass</h1>
        <div className='flex flex-row space-x-8'>
          <div className='w-3/5'>
            <p className='text-black text-2xl'>
              LiveTheLifeTV is a curatorial platform and community that helps bring incredible works of photography to
              discerning collectors. The Founders Mint Pass acts as an access card to our community of digital artists and
              collectors as well as its exclusive events, including art and cultural trips, private auctions, gallery openings,
              and artist dinners. It unlocks priority mints from our roster of iconic and emerging artists! NFT is the product.{' '}
            </p>
            <div className='flex justify-center items-center mt-8'>
              <Button onClick={console.log} label="Join Allowlist" />
            </div>
          </div>

          <div className='flex flex-row border-2 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]'>
            <div className='p-8'>
              <ul>
                <li className='pb-2 list-disc'>Holders of The Founders Mint Pass NFTs have allowlist access to all our drops.</li>
                <li className='pb-2 list-disc'>Free gift of our upcoming limited edition LiveTheLifeTV Merch &amp; Print</li>
                <li className='pb-2 list-disc'>Access to Founders Mint Pass raffle giveaways on the LiveTheLifeTV Discord.</li>
                <li className='pb-2 list-disc'>Access to Collectors Club Discord channel only for Founders Mint Pass owners.</li>
                <li className='pb-2 list-disc'>Discount at all current, future, and affiliate LiveTheLifeTV co-work locations.</li>
                <li className='pb-2 list-disc'>Access to exclusive experiences, one example is our photogrammetry workshop.</li>
              </ul>
            </div>
          </div>
        </div>
        
      </div>
      <div className='w-1/3 -translate-y-14'>
        <div className='border-2 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]'>
          <video controlsList="nodownload" poster="https://openseauserdata.com/files/c0272ec89d3bd2e950c5de4ea4aba9d3.jpg" preload="metadata"><source src="https://openseauserdata.com/files/a5571cf9ab8fe256ad77ea34b8fe6a05.mp4#t=0.001" type="video/mp4"/></video>
        </div>
      </div>
    </div>
    <div className="flex flex-col items-center mt-16">
      <p className='my-4 text-[4rem] italic text-black text-center'>The Metaverse is the digital customer experience.</p>
      <div className='flex flex-row space-x-5'>
        <Link href="" title="Spatial"><a>Spatial</a></Link>
        <Link href="" title="oncyber"><a>oncyber</a></Link>
      </div>
    </div>
  </div>
)
