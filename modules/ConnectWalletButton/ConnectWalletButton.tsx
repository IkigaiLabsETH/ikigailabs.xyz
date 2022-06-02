import React, { FC } from 'react'
import { useWallet } from '../../common/useWallet'

interface ConnectWalletButtonProps {
  connectLabel: string
  disconnectLabel: string
}

export const ConnectWalletButton: FC<ConnectWalletButtonProps> = ({ connectLabel, disconnectLabel }) => {
  const { address, connect, disconnect } = useWallet()

  return !address ? (
    <a
      href="#"
      title="label"
      className="inline-flex items-center justify-center px-4 py-2 text-base font-semibold text-gray-900 transition-all duration-200 bg-gray-100 border border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 hover:bg-gray-200"
      role="button"
      onClick={connect}
    >
      {connectLabel}
    </a>
  ) : (
    <div>
      {address}
      <a
        href="#"
        title="label"
        className="inline-flex items-center justify-center px-4 py-2 text-base font-semibold text-gray-900 transition-all duration-200 bg-gray-100 border border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 hover:bg-gray-200"
        role="button"
        onClick={disconnect}
      >
        {disconnectLabel}
      </a>
    </div>
  )
}
