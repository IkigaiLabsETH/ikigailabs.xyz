import React, { FC, useState } from 'react'
import { useWallet } from '../../common/useWallet'
import { truncateAddress } from '../../common/utils'
import { Balance } from '../Balance'

interface ProfileProps {
  connectLabel?: string
  disconnectLabel?: string
}

export const Profile: FC<ProfileProps> = ({ connectLabel = 'Connect', disconnectLabel = 'Disconnect' }) => {
  const { address, connect, disconnect } = useWallet()
  const [showDropdown, setShowDropdown] = useState<boolean>(false)

  const showClasses = showDropdown ? 'rotate-180' : ''

  return !address ? (
    <a
      href="#"
      title={connectLabel}
      className="inline-flex items-center justify-center px-4 py-2 text-base font-semibold text-white transition-all duration-300 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-700"
      role="button"
      onClick={() => connect().then(console.log)}
    >
      {connectLabel}
    </a>
  ) : (
    <div className="items-end flex flex-col">
      <a
        role="button"
        onClick={() => setShowDropdown(!showDropdown)}
        className="relative flex items-center px-4 py-2 text-base font-semibold transition-all duration-200 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 hover:bg-gray-100"
      >
        {truncateAddress(address)} <span className="pl-1">|</span> <Balance />
        <svg
          className={`w-4 h-4 ml-2 transition-all duration-300 ${showClasses}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </a>
      {showDropdown && (
        <div className="z-10 top-20 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute">
          <ul
            className="py-1 text-base font-semibold text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefault"
          >
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white transition-all duration-300"
              >
                Profile
              </a>
            </li>
            <li>
              <a
                href="#"
                title="label"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white transition-all duration-300"
                role="button"
                onClick={disconnect}
              >
                {disconnectLabel}
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}
