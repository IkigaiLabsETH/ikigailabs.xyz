import React, { FC, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { ConnectWalletButton } from '../ConnectWalletButton'

export const Header: FC = () => {
  const [expanded, setExpanded] = useState<Boolean>(false)

  return (
    <header className="relative py-4 sm:py-6">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          <div className="shrink-0">
            <a href="#" title="" className="flex items-center">
              <Image src="/logo.png" alt="logo" width="64" height="64" />
            </a>
          </div>

          <div className="flex lg:hidden">
            <button
              type="button"
              className="p-1 text-gray-900 transition-all duration-200 bg-transparent rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
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

          <div className="hidden lg:flex lg:items-center lg:justify-end lg:space-x-12 lg:mx-20">
            <Link href="#">
              <a
                title="Item 1"
                className="text-base font-medium text-gray-500 transition-all duration-200 hover:text-gray-900"
              >
                Item 1
              </a>
            </Link>

            <Link href="#">
              <a
                title="Item 2"
                className="text-base font-medium text-gray-500 transition-all duration-200 hover:text-gray-900"
              >
                Item 2
              </a>
            </Link>

            <Link href="#">
              <a
                title="Item 3"
                className="text-base font-medium text-gray-500 transition-all duration-200 hover:text-gray-900"
              >
                Item 3
              </a>
            </Link>
          </div>

          <div className="hidden lg:flex">
            <ConnectWalletButton connectLabel="Connect Wallet" disconnectLabel="Disconnect"/>
          </div>
        </nav>
        {expanded && (
          <nav>
            <div className="px-1 py-5">
              <div className="grid gap-y-6">
                <Link href="#">
                  <a
                    title="Item 1"
                    className="text-base font-medium text-gray-500 transition-all duration-200 hover:text-gray-900"
                  >
                    Item 1
                  </a>
                </Link>

                <Link href="#">
                  <a
                    title="Item 2"
                    className="text-base font-medium text-gray-500 transition-all duration-200 hover:text-gray-900"
                  >
                    Item 2
                  </a>
                </Link>

                <Link href="#">
                  <a
                    title="Item 3"
                    className="text-base font-medium text-gray-500 transition-all duration-200 hover:text-gray-900"
                  >
                    Item 3
                  </a>
                </Link>

                <ConnectWalletButton connectLabel="Connect Wallet" disconnectLabel="Disconnect" />
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
