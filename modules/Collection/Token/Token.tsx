import { match } from 'ts-pattern'
import React, { FC, useState } from 'react'
import { isEmpty, map, pathOr, prop, propOr } from 'ramda'

import { useAppDispatch, useAppSelector } from '../../../common/redux/store'
import { Loader } from '../../Loader'
import { selectCollectionToken } from './token.selectors'
import { QueryStatus } from '@reduxjs/toolkit/dist/query'
import { Head, HeaderCell, Row, Table, Body, Cell } from '../../Table'
import { Eth } from '../../Eth'
import { ethToWei, replaceImageResolution } from '../../../common/utils/utils'
import { Button } from '../../Button'
import { buyToken, placeBid, selectCollectionTokenInteractionStatus } from './token.slice'
import { TextField } from '../../Form'
import { useAddress } from '@thirdweb-dev/react'
import Link from 'next/link'

interface TokenProps {
  contract: string
  tokenId: string
}

export const Token: FC<TokenProps> = ({ contract, tokenId }) => {
  const address = useAddress()
  const { data: token, status: tokenStatus } = useAppSelector(selectCollectionToken({ contract, tokenId }))
  const { status: tokenInteractionStatus } = useAppSelector(selectCollectionTokenInteractionStatus)
  const [eth, setEth] = useState<string>('0')
  const dispatch = useAppDispatch()

  const onBuyToken = () => {
    return dispatch(buyToken({ contract, tokenId }))
  }

  const onCreateBid = () => {
    const wei = ethToWei(parseFloat(eth)).toString()
    return dispatch(placeBid({ contract, tokenId, wei }))
  }

  const onSetEth = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEth(e.target.value)
  }

  const loader = (
    <div className="flex w-screen h-screen justify-center items-center bg-white">
      <Loader />
    </div>
  )

  const component = () => {
    const {
      token: { image, name, description, attributes, owner, contract, tokenId, kind },
      market: { floorAsk, topBid },
    } = token as any
    const floorPriceSource = prop('source')(floorAsk)
    const topBidSource = prop('source')(topBid)

    return (
      <div className="w-full bg-white flex items-center flex-col">
        <img src={replaceImageResolution(2000)(image)} title={name as string} className="w-full" />
        <div className="p-16 max-w-screen-2xl">
          <div className="mb-8">
            <div className='pb-4 text-red font-bold'>
              <Link href={`/collection/${contract}`}>&larr; Back to collection</Link>
            </div>
            <h1 className="boska text-[4rem] lg:text-[6rem] text-black mb-0">{name}</h1>
            {owner && (
              <p className="text-s text-gray-500 pl-1 mb-0 mt-4">
                <span className="font-bold">Owner:</span> {owner}
              </p>
            )}
          </div>
          <div className="flex bg-white text-black">
            <div className="w-2/3 mr-8">
              <p className="text-xl text-black pr-16 leading-relaxed">{description}</p>
              <div className="mt-28">
                {attributes && (
                  <Table>
                    <Head>
                      <Row>
                        <HeaderCell>Attribute</HeaderCell>
                        <HeaderCell>&nbsp;</HeaderCell>
                        <HeaderCell>Floor Price</HeaderCell>
                        <HeaderCell>Tokens</HeaderCell>
                        <HeaderCell>On sale</HeaderCell>
                      </Row>
                    </Head>
                    <Body>
                      {map(
                        (attribute: {
                          key: string
                          value: string
                          floorAskPrice: number | null
                          onSaleCount: number
                          tokenCount: number
                        }) => (
                          <Row key={attribute.value}>
                            <Cell>{attribute.key}</Cell>
                            <Cell>{attribute.value}</Cell>
                            <Cell>{attribute.floorAskPrice ? attribute.floorAskPrice : '—'}</Cell>
                            <Cell>{attribute.tokenCount ? attribute.tokenCount : '—'}</Cell>
                            <Cell>{attribute.onSaleCount ? attribute.onSaleCount : '—'}</Cell>
                          </Row>
                        ),
                      )(attributes as [])}
                    </Body>
                  </Table>
                )}
              </div>
              <div className="border-t-2 mt-8 border-black mr-16">
                <ul className="text-gray-800 text-xs p-4 pl-0">
                  <li className="mb-1">
                    <span className="font-bold">Contract:</span> {contract}
                  </li>
                  <li className="mb-1">
                    <span className="font-bold">Token Id:</span> {tokenId}
                  </li>
                  <li className="mb-1">
                    <span className="font-bold">Standard:</span> {kind}
                  </li>
                </ul>
              </div>
              <div className='pt-8 text-red font-bold'>
                <Link href={`/collection/${contract}`}>&larr; Back to collection</Link>
              </div>
            </div>
            <div className="w-1/3">
              <div className="border-2 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] p-4 mb-6">
                <div className="text-2xl mb-1 font-bold">
                  Floor price:
                  <div className="font-bold text-4xl my-4">
                    <Eth amount={pathOr('—', ['price', 'amount', 'native'])(floorAsk)} />
                  </div>
                  <div className="text-sm text-gray-700 italic">
                    {isEmpty(floorPriceSource) ? '' : ` on ${propOr('', 'name')(floorPriceSource)}`}
                  </div>
                </div>
              </div>
              <div className="border-2 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] p-4 mb-6">
                <div className="text-2xl mb-1 font-bold">
                  Top bid:
                  <div className="font-bold text-4xl my-4">
                    <Eth amount={pathOr('—', ['price', 'amount', 'native'])(topBid)} />
                  </div>
                  <div className="text-sm text-gray-700 italic">
                    {isEmpty(topBidSource) ? '' : ` on ${propOr('', 'name')(topBidSource)}`}
                  </div>
                </div>
              </div>
              <div>
                <div className="mb-6">
                  {pathOr('—', ['price', 'amount', 'native'])(floorAsk) !== '—' ? (
                    <div>
                      <Button
                        onClick={onBuyToken}
                        className="w-full text-xl"
                        loading={tokenInteractionStatus === 'pending'}
                        disabled={!address}
                      >
                        Buy Now
                      </Button>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                <div>
                  <div>
                    <TextField
                      id="bidAmount"
                      label="Amount"
                      value={eth}
                      onChange={onSetEth}
                      type="number"
                      valid={true}
                      step={0.01}
                    />
                    <Button
                      onClick={onCreateBid}
                      className="w-full text-xl"
                      loading={tokenInteractionStatus === 'pending'}
                      disabled={!address}
                    >
                      Make Offer
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return match(tokenStatus)
    .with(QueryStatus.uninitialized, () => loader)
    .with(QueryStatus.pending, () => loader)
    .with(QueryStatus.fulfilled, component)
    .otherwise(() => <></>)
}
