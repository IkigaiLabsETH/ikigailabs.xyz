import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CryptoPrices: React.FC = () => {
  const [btcPrice, setBtcPrice] = useState(0);
  const [ethPrice, setEthPrice] = useState(0);
  const [solPrice, setSolPrice] = useState(0);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd');
        setBtcPrice(response.data.bitcoin.usd);
        setEthPrice(response.data.ethereum.usd);
        setSolPrice(response.data.solana.usd);
      } catch (error) {
        console.error('Failed to fetch prices:', error);
      }
    };

    fetchPrices();
  }, []);

  return (
    <div className="flex items-center justify-center space-x-4">
      <div>BTC: ${Math.floor(btcPrice)}</div>
      <div>ETH: ${Math.floor(ethPrice)}</div>
      <div>SOL: ${Math.floor(solPrice)}</div>
    </div>
  );
};

export default MarketStats;