import React, { FC } from 'react'
import { Link } from '../Link'

interface SuccessfulMintModalProps {
  contract: string
  tokenId?: string
}

export const SuccessfulMintModal: FC<SuccessfulMintModalProps> = ({ contract, tokenId }) => {
  return (
    <div className="p-10">
      <h1>Mint successful</h1>
      <p className="text-gray-800 text-xl">Your NFT has been minted and is now available in your wallet.</p>
      <Link href={`/drop/${contract}/${tokenId ? tokenId : ''}`} title="View your NFT">
        View your NFT
      </Link>
    </div>
  )
}
