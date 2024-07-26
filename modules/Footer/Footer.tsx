import React, { FC } from 'react'
import Image from 'next/image'
import { MarketStats } from '../MarketStats'
import Link from 'next/link'

export const Footer: FC = () => (
  <div className="flex flex-row px-4 mx-auto max-w-screen-2xl sm:px-6 lg:px-8 justify-between items-center w-full py-8">
    <div className="flex items-left justify-center text-16 font-bold tracking-tighter leading-none flex-col">
      &copy; {new Date().getFullYear()} IKIGAI LABS XYZ
      <ul className='font-normal mt-6'>
        <li className='p-1'>
          <Link href="/disclosures">
            Disclosures
          </Link>
        </li>
        <li className='p-1'>
          <Link href="/privacy-policy">
            Privacy Policy
          </Link>
        </li>
        <li className='p-1'>
          <Link href="/terms-of-use">
            Terms of use
          </Link>
        </li>
        <li className='p-1'>
          <Link href="/ambassadors">
            Ambassadors
          </Link>
        </li>
      </ul>

    </div>
    <MarketStats />
    <div className="flex items-center justify-end">
      <a href="#" title="" className="flex items-center">
        <Image src="/assets/images/IKIGAI_LABS_logo.svg" alt="logo" width="32" height="32" />
      </a>
    </div>
  </div>
)
