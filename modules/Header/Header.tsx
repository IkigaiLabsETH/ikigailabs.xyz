import React, { FC, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Profile } from '../Profile'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { selectedNetwork } from '../NetworkSelector'
import { useAppSelector } from '../../common/redux/store'
import { NetworkSelector } from '../NetworkSelector/NetworkSelector'

export const Header: FC = () => {
  const [expanded, setExpanded] = useState<Boolean>(false)
  const { pathname } = useRouter()
  const network = useAppSelector(selectedNetwork)

  useEffect(() => {
    setExpanded(false)
  }, [pathname])

  return (
    <header className="fixed py-4 sm:py-6 z-20 w-full">
      <div className="px-4 mx-auto max-w-screen-2xl sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          <div className="w-52 z-20">
            <Link href="/" title="" className="flex items-center">
              <a>
                <Image src="/assets/images/IKIGAI_LABS_logo.svg" alt="logo" width="32" height="32" />
              </a>
            </Link>
          </div>

          <div className="flex flex-row justify-end">
            <div className="hidden md:flex">
              <Profile />
            </div>
            <button
              className="z-20 ml-1"
              onClick={() => setExpanded(!expanded)}
              aria-expanded={expanded ? 'true' : 'false'}
            >
              {!expanded && (
                <span>
                  <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </span>
              )}

              {expanded && (
                <span aria-hidden="true">
                  <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </span>
              )}
            </button>
          </div>
        </nav>

        <nav
          className={`absolute flex backdrop-blur top-0 items-center justify-end transition-all duration-300 visible delay-75 h-screen w-full ${
            expanded ? 'opacity-100 left-0' : 'opacity-0 left-full'
          }`}
        >
          <div
            className={`p-5 text-4xl md:text-6xl text-yellow font-bold transition-all ${
              expanded ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className="flex justify-end">
              <Link href="/">
                <a title="Home" className="p-4 bg-black mb-1 inline-block">
                  Home
                </a>
              </Link>
            </div>
            <div className="flex justify-end">
              <Link href={`/${network}/explore`}>
                <a title="Explore" className="p-4 bg-black mb-1 inline-block">
                  Explore
                </a>
              </Link>
            </div>
            <div className="flex justify-end">
              <Link href={`/dashboard/collected/${network}`}>
                <a title="Dashboard" className="p-4 bg-black mb-1 inline-block">
                  Dashboard
                </a>
              </Link>
            </div>
            <div className="flex justify-end">
              <Link href="/about">
                <a title="About" className="p-4 bg-black mb-1 inline-block">
                  About
                </a>
              </Link>
            </div>
            <div className="flex justify-end">
              <a title="About" href="https://livethelife.tv" className="p-4 bg-black mb-1 inline-block">
                Edito
              </a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}
