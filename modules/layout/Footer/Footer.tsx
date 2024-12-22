import React, { FC } from 'react'
import Image from 'next/image'
import { MarketStats } from '../MarketStats'
import Link from 'next/link'

export const Footer: FC = () => (
  <div className="flex flex-col md:flex-row text-center px-4 mx-auto max-w-screen-2xl sm:px-6 lg:px-8 justify-between w-full py-8 mb-8">
    <div className="flex items-left justify-center font-bold flex-col">
      <ul className='font-normal mb-8'>
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
          <Link href="/about">
            About Ikigai
          </Link>
        </li>
      </ul>

    </div>
    <div className='mb-8'>
      <MarketStats />
    </div>
    <div className="mb-8">
      <Link href="/" title="" className="flex w-full justify-center items-center">
        <span className='pr-2 mr-1.5 border-r '>&copy; {new Date().getFullYear()} IKIGAI LABS XYZ </span><Image src="/assets/images/IKIGAI_LABS_logo.svg" alt="logo" width="16" height="16" />
      </Link>
    </div>
  </div>
)
