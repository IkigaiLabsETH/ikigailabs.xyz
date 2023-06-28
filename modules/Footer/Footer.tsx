import React, { FC } from 'react'
import Image from 'next/image'

export const Footer: FC = () => (
  <div className="flex flex-row px-4 mx-auto max-w-screen-2xl sm:px-6 lg:px-8 justify-between items-center w-full py-8">
    <div className="flex items-center justify-center text-16 font-bold tracking-tighter leading-none">
      IKIGAI LABS XYZ
    </div>
    <div className="flex items-center justify-center">
      <ul className="flex flex-row items-center">
        <li className="p-4 w-16">
          <a href="https://discord.gg/aAuvja73Cg">
            <Image src="/assets/images/discord.svg" alt="discord" width={41} height={32} />
          </a>
        </li>
        <li className="p-4 w-16">
          <a href="https://twitter.com/ikigailabsETH">
            <Image src="/assets/images/twitter.svg" alt="discord" width={32} height={32} />
          </a>
        </li>
        {/* <li className="p-4 w-16">
          <a href="https://instagram.com" className="flex justify-center items-center">
            <Image src="/assets/images/instagram.svg" alt="discord" width={32} height={32} />
          </a>
        </li> */}
      </ul>
    </div>
    <div className="flex items-center justify-end">
      <a href="#" title="" className="flex items-center">
        <Image src="/assets/images/IKIGAI_LABS_logo.svg" alt="logo" width="32" height="32" />
      </a>
    </div>
  </div>
)
