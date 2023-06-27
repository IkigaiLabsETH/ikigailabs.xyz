import React, { FC } from 'react'
import { URLS } from '../../common/config'
import { Network } from '../../common/types'

interface SuccessfulModalProps {
  transactionHash: string
  id: number
  network: Network
}

export const SuccessfulModal: FC<SuccessfulModalProps> = ({ transactionHash, network }) => {
  return (
    <div className="p-10">
      <h1>Mint successful</h1>
      <p className="text-gray-800 text-xl">Your NFT has been minted. It will be revealed when all tokens have been minted</p>
      <a href={`${URLS[network].explorer}/tx/${transactionHash}`} target="_blank" className="text-yellow text-xl">View your transaction</a>
    </div>
  )
}
