export interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  attributes?: Array<{
    trait_type: string;
    value: string | number;
  }>;
}

export interface NFTToken {
  id: string;
  tokenId: string;
  contract: string;
  metadata: NFTMetadata;
  owner: string;
}

export interface NFTCollection {
  id: string;
  name: string;
  description?: string;
  image?: string;
  contract: string;
  tokenCount: number;
  ownerCount: number;
}

export interface NFTMarketListing {
  id: string;
  token: NFTToken;
  price: string;
  seller: string;
  expires?: number;
}

export interface NFTDrop {
  id: string;
  collection: NFTCollection;
  price: string;
  maxSupply: number;
  startTime: number;
  endTime?: number;
}

export interface NFTActivity {
  id: string;
  type: 'MINT' | 'TRANSFER' | 'SALE' | 'LISTING' | 'OFFER';
  token: NFTToken;
  from: string;
  to: string;
  price?: string;
  timestamp: number;
} 