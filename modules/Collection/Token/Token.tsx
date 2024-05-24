import { match } from 'ts-pattern'
import React, { FC, useState } from 'react'
import { __, divide, isEmpty, isNil, map, pathOr, pipe, prop, propOr } from 'ramda'
import Link from 'next/link'
import Markdown from 'react-markdown'

import { useAppDispatch, useAppSelector } from '../../../common/redux/store'
import { Eth } from '../../Eth'
import { isOwner } from '../../../common/utils'
import { buyToken, selectCollectionTokenInteractionStatus, showListToken, showCreateBid } from './token.slice'
import { Collection, NFT, Network, ResPrice } from '../../../common/types'
import { ReservoirActionButton } from '../../ReservoirActionButton/ReservoirActionButton'
import { Button } from '../../Button'
import { ListingsList } from '../../ListingsList'
import { OffersList } from '../../OffersList'
import { TokenMedia } from '../../TokenMedia'
import { Warning } from '../../Warning'
import { useWallet } from '../../../common/useWallet'
import { TokenActivity } from '../../TokenActivity'

interface TokenProps {
  collection: Collection
  token: NFT
  network: Network
  ens: string
}

export const CollectionToken: FC<TokenProps> = ({ collection, token, network, ens }) => {
  const { address } = useWallet()

  const { status: tokenInteractionStatus } = useAppSelector(selectCollectionTokenInteractionStatus)

  const [activeTab, setActiveTab] = useState<string>('Activity')
  const dispatch = useAppDispatch()

  const onBuyToken = () => {
    return dispatch(buyToken({ contract: token.token.contract, tokenId: token.token.tokenId, address, network }))
  }

  const onCreateBid = ({ network, contract, tokenId, name, media, description, image, royalties }) => {
    dispatch(showCreateBid({ network, contract, tokenId, name, media, description, image, royalties }))
  }

  const onListToken = ({ network, contract, tokenId, name, media, description, image, royalties }) => {
    dispatch(showListToken({ network, contract, tokenId, name, media, description, image, royalties }))
  }

  const {
    token: {
      image,
      imageSmall,
      name,
      description,
      attributes,
      owner,
      contract,
      tokenId,
      kind,
      media,
      isFlagged,
      isNsfw,
      isSpam,
      supply,
    },
    market: { floorAsk, topBid },
  } = token as NFT
  const royalties = pipe(pathOr(0, ['royalties', 'bps']), divide(__, 100))(collection)
  const floorPriceSource = prop('source')(floorAsk)
  const topBidSource = prop('source')(topBid)
  console.log('Collection', collection)
  return (
    <div className="w-full bg-white flex items-center flex-col">
      <div className="flex max-h-screen w-full h-screen justify-center items-center flex-col border-b-4 border-black bg-black">
        <div className="w-full md:w-2/3 lg:3/4 h-screen items-center justify-center flex p-8">
          <div className="w-full flex items-center justify-center relative h-5/6">
            <TokenMedia token={token.token} imageResolution="large" />
          </div>
        </div>
        <div className="relative w-full">
          <div className="absolute bottom-5 left-5 p-6 bg-yellow-500 text-black tracking-wide">
            <h3 className="text-black opacity-40 text-xs md:text-sm font-bold uppercase mb-0 pb-0">
              {collection?.name}
            </h3>
            <h1 className="text-black boska text-base md:text-lg lg:text-xl mb-0 pb-0">{name}</h1>
          </div>
        </div>
      </div>
      <div className="p-8 max-w-screen-2xl w-full">
        {/* <div className="mb-8">
            <div className="pb-4 text-red font-bold">
              <Link href={`/${network}/${contract}`}>&larr; {collection?.name}</Link>
            </div>
          </div> */}
        <div className="flex bg-white text-black flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 mr-8">
            <h1 className="boska text-[3rem] lg:text-[4rem] text-black mb-1">{name}</h1>
            {owner && (
              <p className="text-s text-slate-400 pl-1 mb-4">
                <div>
                  <span className="font-bold">Owned by:</span>
                  <Link href={`/profile/${owner}/collected/${network}`}> {ens ? ens : owner} </Link>
                </div>
              </p>
            )}
            <div className="py-2 w-full h-auto">
              {imageSmall && (
                <img
                  className="w-48 mr-8 mb-4 border-black border-4 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
                  src={imageSmall}
                  alt={name as string}
                  width={150}
                  height={150}
                />
              )}
              <div className="text-xl text-black pr-16 leading-relaxed">
                <Markdown>{description}</Markdown>
              </div>
            </div>
            <div className="w-full">
              {attributes ? (
                <div>
                  <ul className="grid grid-cols-1 lg:grid-cols-3 gap-1 items-start content-start">
                    {map(
                      (attribute: {
                        key: string
                        value: string
                        floorAskPrice: ResPrice
                        onSaleCount: number
                        tokenCount: number
                      }) => (
                        <li
                          key={`${attribute.value}-${attribute.key}`}
                          className="text-gray-800 text-xs p-2 border-2 border-gray-200 flex flex-col h-full justify-between"
                        >
                          <div className="flex flex-row w-full mb-2">
                            <div className="w-2/3">
                              <div className="capitalize mb-0.5">{attribute.key}</div>
                              <div className="text-lg font-bold leading-none">{attribute.value}</div>
                            </div>
                            <div className="w-1/3 flex items-end flex-col">
                              <div className="capitalize mb-0.5">floor</div>
                              <div className="font-bold text-base">
                                <Eth amount={attribute.floorAskPrice?.amount?.decimal} />
                              </div>
                            </div>
                          </div>
                          <div className="bg-slate-100 p-1 w-auto">
                            {attribute.tokenCount}{' '}
                            ({Intl.NumberFormat('en-US', {
                              style: 'percent',
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }).format(attribute.tokenCount / collection?.tokenCount)}){' '}have this
                          </div>
                        </li>
                      ),
                    )(attributes as [])}
                  </ul>
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="border-t-2 mt-8 border-black">
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
                <li className="mb-1">
                  <span className="font-bold">Supply:</span> {supply}
                </li>
              </ul>
            </div>
            {/* <div className="pt-8 text-red font-bold">
                <Link href={`/${network}/${contract}`}>&larr; {collection?.name}</Link>
              </div> */}
          </div>
          <div className="w-full lg:w-1/2 mt-2">
            <div className="mb-5">
              {isFlagged ? <Warning type="flagged" /> : null}
              {isNsfw ? <Warning type="nsfw" /> : null}
              {isSpam ? <Warning type="spam" /> : null}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="border-2 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] p-4 mb-6">
                <div className="text-2xl mb-8 font-bold">
                  Price:
                  <div className="font-bold text-4xl my-4">
                    <Eth amount={pathOr('—', ['price', 'amount', 'native'])(floorAsk)} />
                  </div>
                  <div className="text-sm text-gray-700 italic">
                    {isNil(floorPriceSource) ? '' : ` on ${propOr('', 'name')(floorPriceSource)}`}
                  </div>
                </div>
                {!isFlagged ? (
                  pathOr('—', ['price', 'amount', 'native'])(floorAsk) !== '—' && !isOwner(address)(token.token) ? (
                    <div>
                      <ReservoirActionButton
                        onClick={onBuyToken}
                        loading={tokenInteractionStatus === 'pending'}
                        disabled={!address}
                        label="Buy Now"
                        network={network}
                      ></ReservoirActionButton>
                    </div>
                  ) : isOwner(address)(token.token) ? (
                    <div>
                      <Button
                        className="text-black font-bold text-xl hover:text-yellow w-full"
                        onClick={() =>
                          onListToken({ contract, tokenId, name, media, description, image, network, royalties })
                        }
                      >
                        List for sale
                      </Button>
                    </div>
                  ) : (
                    <></>
                  )
                ) : null}
              </div>
              <div className="border-2 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] p-4 mb-6">
                <div className="text-2xl mb-8 font-bold">
                  Top offer:
                  <div className="font-bold text-4xl my-4">
                    <Eth amount={pathOr('—', ['price', 'amount', 'native'])(topBid)} />
                  </div>
                  <div className="text-sm text-gray-700 italic">
                    {isEmpty(topBidSource) || isNil(topBidSource) ? '' : ` on ${propOr('', 'name')(topBidSource)}`}
                  </div>
                </div>
                {!isFlagged ? (
                  !isOwner(address)(token.token) ? (
                    <div>
                      <Button
                        className="text-black font-bold text-xl hover:text-yellow w-full"
                        onClick={() =>
                          onCreateBid({ contract, tokenId, name, media, description, image, network, royalties })
                        }
                      >
                        Make offer
                      </Button>
                    </div>
                  ) : pathOr('—', ['price', 'amount', 'native'])(topBid) !== '—' ? (
                    <div>
                      <Button
                        className="text-black font-bold text-xl hover:text-yellow w-full"
                        onClick={() =>
                          onListToken({ contract, tokenId, name, media, description, image, network, royalties })
                        }
                      >
                        Sell
                      </Button>
                    </div>
                  ) : (
                    <></>
                  )
                ) : null}
              </div>
            </div>
            <div className="block w-full">
              <nav className="flex space-x-4 font-bold border-b border-b-gray-400 w-full" aria-label="Tabs">
                <button
                  onClick={() => setActiveTab('Activity')}
                  className={`p-4 border-b-4 border-white hover:border-black hover:text-black transition-all ${
                    activeTab === 'Activity' ? 'text-black' : 'text-gray-400 border-b-white'
                  }`}
                >
                  Activity
                </button>
                <button
                  onClick={() => setActiveTab('Listings')}
                  className={`p-4 border-b-4 border-white hover:border-black hover:text-black transition-all ${
                    activeTab === 'Listings' ? 'text-black' : 'text-gray-400 border-b-white'
                  }`}
                >
                  Listings
                </button>
                <button
                  onClick={() => setActiveTab('Offers')}
                  className={`p-4 border-b-4 border-white hover:border-black hover:text-black transition-all ${
                    activeTab === 'Offers' ? 'text-black' : 'text-gray-400 border-b-white'
                  }`}
                >
                  Offers
                </button>
                <button
                  onClick={() => setActiveTab('Info')}
                  className={`p-4 border-b-4 border-white hover:border-black hover:text-black transition-all ${
                    activeTab === 'Info' ? 'text-black' : 'text-gray-400 border-b-white'
                  }`}
                >
                  Info
                </button>
              </nav>
            </div>
            <div className="my-4 max-h-screen-50 overflow-x-hidden overflow-auto pr-4">
              {match(activeTab)
                .with('Info', () => (
                  <div className="info-tab">
                    <Markdown>{collection?.description}</Markdown>
                  </div>
                ))
                .with('Activity', () => <TokenActivity contract={contract} tokenId={tokenId} network={network} />)
                .with('Listings', () => <ListingsList contract={contract} tokenId={tokenId} network={network} />)
                .with('Offers', () => (
                  <OffersList
                    contract={contract}
                    tokenId={tokenId}
                    network={network}
                    isOwner={isOwner(address)(token.token)}
                  />
                ))
                .otherwise(() => null)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
