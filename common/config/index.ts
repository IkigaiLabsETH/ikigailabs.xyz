export const FEATURED_DROP = '0x3C9A5EeB4D7126D759B64B9129C23012CF802313'

export const NFTDrops = ['0xcE998593C8f0790ff41a488c83B2Af5E47C27258', '0x025c59a275Ca6DB964eeE1694c6614AcE62F1568']

export const FREE_MINT_CONTRACT = '0xA6235A5A3599e3333CBd173dB3Eb7060c74f3Ced'
export const FREE_MINT_TOKEN_ID = 0

export const BURN_TO_MINT_1155 = '0xd6aC136fC352eB4EF372095CC9fe9ED7dfEdF504'
export const BURN_TO_MINT_721 = '0xf76afb63f9A808cF6A0F05Ea888C014e89d82F0C'

export const BURN_TO_MINT = {
  odessyGenesisCollection: {
    sourceContract: '0xd6aC136fC352eB4EF372095CC9fe9ED7dfEdF504',
    targets: [
      { tokenId: '0', targetContract: '0xf76afb63f9A808cF6A0F05Ea888C014e89d82F0C' },
      { tokenId: '1', targetContract: '' },
      { tokenId: '2', targetContract: '' },
    ],
  },
}

export const MINT_PASSES = [
  ['0x272991224665Dc0F905e525ce0e2e1E4BA108B71', 0],
  ['0x4C390E37031c2AB8f5F036E21f1D19f0794415E3', 0],
  ['0xB323669aFD9094189893cBFB535E2837abDb58f1', 0],
]

export type ContractTokenId = [string, number]
