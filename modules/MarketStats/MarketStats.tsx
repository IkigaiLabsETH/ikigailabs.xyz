import React, { useEffect, useState } from 'react'
import axios from 'axios'

const MarketStats: React.FC = () => {
  const [btcPrice, setBtcPrice] = useState(0)
  const [ethPrice, setEthPrice] = useState(0)
  const [solPrice, setSolPrice] = useState(0)

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd',
        )
        setBtcPrice(response.data.bitcoin.usd)
        setEthPrice(response.data.ethereum.usd)
        setSolPrice(response.data.solana.usd)
      } catch (error) {
        console.error('Failed to fetch prices:', error)
      }
    }

    fetchPrices()
  }, [])

  return (
    <ul className="flex justify-start flex-col font-normal">
      <li className='p-1'>BTC: ${Math.floor(btcPrice)}</li>
      <li className='p-1'>ETH: ${Math.floor(ethPrice)}</li>
      <li className='p-1'>SOL: ${Math.floor(solPrice)}</li>
    </ul>
  )
}

export default MarketStats
