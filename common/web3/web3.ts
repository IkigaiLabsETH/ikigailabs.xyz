import { ChainOrRpc, ThirdwebSDK } from '@thirdweb-dev/sdk'

const chain = (process.env.NEXT_CHAIN || 'rinkeby') as ChainOrRpc

export const sdk = new ThirdwebSDK(chain)
