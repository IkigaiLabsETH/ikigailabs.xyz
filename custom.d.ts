/// <reference types="react" />

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

declare module "*.svg" {
  const content: any;
  export default content;
}

declare module "*.png" {
  const content: any;
  export default content;
}

declare module "*.jpg" {
  const content: any;
  export default content;
}

declare module "*.jpeg" {
  const content: any;
  export default content;
}

declare module "*.gif" {
  const content: any;
  export default content;
}

declare module "*.webp" {
  const content: any;
  export default content;
}

declare module '@reservoir0x/reservoir-sdk' {
  export interface ReservoirClientOptions {
    apiBase: string
    apiKey?: string
    source?: string
    logLevel?: number
    chains: {
      id: number
      active: boolean
      name: string
    }[]
  }

  export interface ProgressStep {
    message: string
    status: 'complete' | 'incomplete'
    kind: string
  }

  export interface BuyTokenOptions {
    items: {
      token: string
      quantity: number
    }[]
    wallet: any
    onProgress?: (steps: ProgressStep[]) => void
  }

  export interface PlaceBidOptions {
    bids: {
      token: string
      orderbook: 'reservoir' | 'opensea'
      orderKind: 'seaport-v1.5'
      weiPrice: string
      expirationTime: string
    }[]
    wallet: any
    onProgress?: (steps: ProgressStep[]) => void
  }

  export interface ListTokenOptions {
    listings: {
      token: string
      orderbook: 'reservoir' | 'opensea'
      orderKind: 'seaport-v1.5'
      weiPrice: string
      expirationTime: string
    }[]
    wallet: any
    onProgress?: (steps: ProgressStep[]) => void
  }

  export interface CancelOrderOptions {
    ids: string[]
    wallet: any
    onProgress?: (steps: ProgressStep[]) => void
  }

  export interface ReservoirClient {
    actions: {
      buyToken: (options: BuyTokenOptions) => Promise<any>
      placeBid: (options: PlaceBidOptions) => Promise<any>
      listToken: (options: ListTokenOptions) => Promise<any>
      cancelOrder: (options: CancelOrderOptions) => Promise<any>
    }
  }

  export function createClient(options: ReservoirClientOptions): ReservoirClient
}

