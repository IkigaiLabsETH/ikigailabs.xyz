import { match } from 'ts-pattern'
import React, { FC, useEffect, useState } from 'react'
import { __, divide, isEmpty, isNil, map, pathOr, pipe, prop, propOr } from 'ramda'
import { QueryStatus } from '@reduxjs/toolkit/dist/query'
import { useAddress } from '@thirdweb-dev/react'
import Link from 'next/link'

import { useAppDispatch, useAppSelector } from '../../../common/redux/store'
import { Loader } from '../../Loader'
import { selectCollectionToken, selectTokenActivity, selectTokenListings, selectTokenOffers } from './token.selectors'
import { Eth } from '../../Eth'
import { ethToWei, getTokenDataFromTokenSetId, isOwner, replaceImageResolution } from '../../../common/utils'
import {
  acceptOffer,
  buyToken,
  cancelOrder,
  placeBid,
  selectCollectionTokenInteractionStatus,
  showListToken,
} from './token.slice'
import { NFT, Network } from '../../../common/types'
import { ReservoirActionButton } from '../../ReservoirActionButton/ReservoirActionButton'
import { Button } from '../../Button'
import { selectCollection } from '../collection.selectors'
import Image from 'next/image'
import { Activity } from '../../Activity'
import { collectionTokenApi } from './token.api'
import { ListingsList } from '../../ListingsList'
import { OffersList } from '../../OffersList'

interface TokenProps {
  contract: string
  tokenId: string
  network: Network
}

export const Token: FC<TokenProps> = ({ contract, tokenId, network }) => {
  const address = useAddress()
  const { data: tokenActivity, status: tokenActivityStatus } = useAppSelector(
    selectTokenActivity({ contract, tokenId, network }),
  )
  const { data: token, status: tokenStatus } = useAppSelector(selectCollectionToken({ contract, tokenId, network }))
  const { data: tokenListings, status: tokenListingsStatus } = useAppSelector(
    selectTokenListings({ contract, tokenId, network }),
  )
  const { data: tokenOffers, status: tokenOffersStatus } = useAppSelector(
    selectTokenOffers({ contract, tokenId, network }),
  )
  const { data: collection, status: collectionStatus } = useAppSelector(selectCollection({ contract, network }))
  const { status: tokenInteractionStatus } = useAppSelector(selectCollectionTokenInteractionStatus)

  const [eth, setEth] = useState<string>('0')
  const [activeTab, setActiveTab] = useState<string>('Info')
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (activeTab === 'Activity' && tokenActivityStatus === QueryStatus.uninitialized) {
      dispatch(collectionTokenApi.endpoints.getTokenActivity.initiate({ contract, tokenId, network }))
    }
  }, [activeTab])

  useEffect(() => {
    if (activeTab === 'Listings' && tokenListingsStatus === QueryStatus.uninitialized) {
      dispatch(collectionTokenApi.endpoints.getTokenListings.initiate({ contract, tokenId, network }))
    }
  }, [activeTab])

  useEffect(() => {
    if (activeTab === 'Offers' && tokenOffersStatus === QueryStatus.uninitialized) {
      dispatch(collectionTokenApi.endpoints.getTokenOffers.initiate({ contract, tokenId, network }))
    }
  }, [activeTab])

  const onBuyToken = () => {
    return dispatch(buyToken({ contract, tokenId, address, network }))
  }

  const onCreateBid = () => {
    const wei = ethToWei(parseFloat(eth)).toString()
    return dispatch(placeBid({ contract, tokenId, wei, address, network }))
  }

  const onListToken = ({ network, contract, tokenId, name, media, description, image, royalties }) => {
    dispatch(showListToken({ network, contract, tokenId, name, media, description, image, royalties }))
  }

  const onCancelOrder = (id: string) => {
    dispatch(cancelOrder({ id, address, network: network as Network }))
  }

  const onBuyListing = (tokenSetId: string) => {
    const [contract, tokenId] = getTokenDataFromTokenSetId(tokenSetId)
    dispatch(buyToken({ contract, tokenId, address, network: network as Network }))
  }

  const onAcceptOffer = (tokenSetId: string) => {
    const [contract, tokenId] = getTokenDataFromTokenSetId(tokenSetId)
    dispatch(acceptOffer({ contract, tokenId, address, network: network as Network }))
  }

  const loader = (
    <div className="flex w-screen h-screen justify-center items-center bg-white">
      <Loader />
    </div>
  )

  const component = () => {
    if (!token) {
      return (
        <div className="w-full bg-white flex items-center flex-col">
          <div className="p-16 max-w-screen-2xl w-full h-screen text-black flex justify-center items-center">
            <h1>Token not found</h1>
          </div>
        </div>
      )
    }

    const {
      token: { image, name, description, attributes, owner, contract, tokenId, kind, media },
      market: { floorAsk, topBid },
    } = token as NFT
    const royalties = pipe(pathOr(0, ['royalties', 'bps']), divide(__, 100))(collection)
    const floorPriceSource = prop('source')(floorAsk)
    const topBidSource = prop('source')(topBid)
    const owned = isOwner(address)(token.token)

    return (
      <div className="w-full bg-white flex items-center flex-col">
        <div className="flex max-h-screen w-full h-screen justify-center items-center flex-col border-b-4 border-black bg-black">
          <div className="w-full md:w-1/2 h-screen items-center justify-center flex p-8">
            <div className="w-full flex items-center justify-center relative h-2/3">
              {image && !media && (
                <Image
                  src={replaceImageResolution(1500)(image)}
                  title={name as string}
                  alt={name as string}
                  fill={true}
                  style={{ maxHeight: '75vh' }}
                  className="border-yellow border-4 shadow-[6px_6px_0px_0px_rgba(249,212,0,1)] w-auto relative"
                />
              )}
              {media && (
                <video
                  src={media}
                  title={name as string}
                  controls={false}
                  autoPlay
                  className="border-yellow border-4 shadow-[6px_6px_0px_0px_rgba(249,212,0,1)]"
                />
              )}
            </div>
          </div>
          <div className="flex w-full max-w-screen-2xl items-end justify-start">
            <h1 className="boska text-[3rem] md:text-[4rem] lg:text-[8rem] text-yellow mb-16 px-6">{name}</h1>
          </div>
        </div>
        <div className="p-8 max-w-screen-2xl w-full">
          <div className="mb-8">
            <div className="pb-4 text-red font-bold">
              <Link href={`/${network}/${contract}`}>&larr; {collection?.name}</Link>
            </div>
          </div>
          <div className="flex bg-white text-black flex-col lg:flex-row">
            <div className="w-full lg:w-1/2 mr-8">
              <h1 className="boska text-[3rem] lg:text-[4rem] text-black mb-1">{name}</h1>
              {owner && (
                <p className="text-s text-slate-400 pl-1 mb-4">
                  <span className="font-bold">Owned by:</span> {owner}
                </p>
              )}
              <div className="py-2 w-full h-auto">
                <img
                  className="w-48 mr-8 mb-4 border-black border-4 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
                  src={image}
                  alt={name as string}
                  width={150}
                  height={150}
                />
                <p className="text-xl text-black pr-16 leading-relaxed">{description}</p>
              </div>
              <div className="w-full">
                {attributes ? (
                  <div>
                    <ul className="grid grid-cols-1 lg:grid-cols-2 gap-1 items-start content-start">
                      {map(
                        (attribute: {
                          key: string
                          value: string
                          floorAskPrice: number | null
                          onSaleCount: number
                          tokenCount: number
                        }) => (
                          <li key={attribute.value} className="text-gray-800 text-xs p-4 border-2 border-black">
                            <div className="flex flex-row w-full mb-2">
                              <div className="w-3/4">
                                <div className="capitalize mb-0.5">{attribute.key}</div>
                                <div className="text-xl font-bold">{attribute.value}</div>
                              </div>
                              <div className="w-1/4">
                                <div className="capitalize mb-0.5">floor</div>
                                <div className="text-xl font-bold">
                                  <Eth amount={attribute.floorAskPrice} />
                                </div>
                              </div>
                            </div>
                            <div className="bg-slate-100 w-auto p-1 inline">
                              Rarity:{' '}
                              {Intl.NumberFormat('en-US', {
                                style: 'percent',
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }).format(attribute.tokenCount / collection?.tokenCount)}
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
                </ul>
              </div>
              <div className="pt-8 text-red font-bold">
                <Link href={`/${network}/${contract}`}>&larr; {collection?.name}</Link>
              </div>
            </div>
            <div className="w-full lg:w-1/2 mt-2">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="border-2 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] p-4 mb-6">
                  <div className="text-2xl mb-8 font-bold">
                    Floor price:
                    <div className="font-bold text-4xl my-4">
                      <Eth amount={pathOr('—', ['price', 'amount', 'native'])(floorAsk)} />
                    </div>
                    <div className="text-sm text-gray-700 italic">
                      {isEmpty(floorPriceSource) ? '' : ` on ${propOr('', 'name')(floorPriceSource)}`}
                    </div>
                  </div>
                  {pathOr('—', ['price', 'amount', 'native'])(floorAsk) !== '—' && !isOwner(address)(token.token) ? (
                    <div>
                      <ReservoirActionButton
                        onClick={onBuyToken}
                        loading={tokenInteractionStatus === 'pending'}
                        disabled={!address}
                        label="Buy Now"
                        network={network}
                      ></ReservoirActionButton>
                    </div>
                  ) : (
                    <></>
                  )}
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
                  {!isOwner(address)(token.token) ? (
                    <div>
                      <ReservoirActionButton
                        onClick={onCreateBid}
                        loading={tokenInteractionStatus === 'pending'}
                        disabled={!address}
                        label="Make Offer"
                        network={network}
                      ></ReservoirActionButton>
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
                  )}
                </div>
              </div>
              <div className="block w-full">
                <nav className="flex space-x-4 font-bold border-b border-b-gray-400 w-full" aria-label="Tabs">
                  <button
                    onClick={() => setActiveTab('Info')}
                    className={`p-4 border-b-4 border-white hover:border-black hover:text-black transition-all ${
                      activeTab === 'Info' ? 'text-black' : 'text-gray-400 border-b-white'
                    }`}
                  >
                    Info
                  </button>
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
                </nav>
              </div>
              <div className="my-4 max-h-screen-50 overflow-x-hidden overflow-auto pr-4">
                {match(activeTab)
                  .with('Info', () => <>{collection?.description}</>)
                  .with('Activity', () => (
                    <>
                      {tokenActivityStatus !== QueryStatus.fulfilled ? (
                        <Loader />
                      ) : (
                        <Activity activity={tokenActivity?.activities} />
                      )}
                    </>
                  ))
                  .with('Listings', () => (
                    <>
                      {tokenListingsStatus !== QueryStatus.fulfilled ? (
                        <Loader />
                      ) : (
                        <ListingsList
                          orders={tokenListings.orders}
                          status={tokenInteractionStatus}
                          onCancel={onCancelOrder}
                          onBuy={onBuyListing}
                        />
                      )}
                    </>
                  ))
                  .with('Offers', () => (
                    <>
                      {tokenOffersStatus !== QueryStatus.fulfilled ? (
                        <Loader />
                      ) : (
                        <OffersList
                          orders={tokenOffers.orders}
                          status={tokenInteractionStatus}
                          onCancel={onCancelOrder}
                          onAccept={onAcceptOffer}
                          isOwner={owned}
                        />
                      )}
                    </>
                  ))
                  .otherwise(() => null)}
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
