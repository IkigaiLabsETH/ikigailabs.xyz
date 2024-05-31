import React, { FC, useEffect, useState } from 'react'
import { includes, join, map, pipe, reduce } from 'ramda'
import clsx from 'clsx'
import { FaMagnifyingGlass } from 'react-icons/fa6'

import { supportedChains } from '../../common/config'
import { ReservoirChain } from '../../common/config/chains'
import { SearchResult, Network } from '../../common/types'
import {
  filterOutChains,
  toggleListItem,
  findChainIconByChainId,
  findChainNameByChainId,
  formatAmount,
  formatNumber,
} from '../../common/utils'
import { useDebounceCallback } from 'usehooks-ts'
import { useAppDispatch, useAppSelector } from '../../common/redux/store'
import { searchApi, selectSearchResults } from './search.api'
import { QueryStatus } from '@reduxjs/toolkit/query'
import { SkeletonLoader } from '../SkeletonLoader'
import Link from 'next/link'

interface SearchProps {}

export const Search: FC<SearchProps> = ({}) => {
  const [selectedChains, setSelectedChains] = useState<number[]>([1])
  const [inFocus, setInFocus] = useState(false)
  const [prefix, setPrefix] = useState('')
  const [query, setQuery] = useState('')
  const dispatch = useAppDispatch()
  const { status, data } = useAppSelector(selectSearchResults({ query }))

  useDebounceCallback(setQuery, 1000)

  useEffect(() => {
    const hideBox = () => setInFocus(false)
    window.addEventListener('click', hideBox)
  }, [])

  useEffect(() => {
    if (!prefix) {
      setQuery('')
      return
    }
    const chains = pipe(join('&chains='), (string: string) => `chains=${string}`)(selectedChains)
    setQuery(`prefix=${prefix}&${chains}`)
  }, [selectedChains, prefix])

  useEffect(() => {
    if (!query) return
    dispatch(searchApi.endpoints.search.initiate({ query }))
  }, [query, dispatch])

  const updateChainSelection = (chain: number) => {
    const updatedChains = toggleListItem(chain, selectedChains)
    setSelectedChains(updatedChains)
  }

  return (
    <>
      <div
        className={clsx('w-full min-h-svh backdrop-blur-sm absolute top-0 left-0', inFocus ? 'block' : 'hidden')}
      ></div>
      <div className={clsx('relative transition-all ease-in-out duration-300', inFocus ? 'w-full' : 'w-1/3')}>
        <div
          onClick={e => {
            e.stopPropagation()
          }}
        >
          <div
            className="flex flex-row items-center bg-black text-yellow p-1 px-2 border-2 border-yellow"
            onFocus={() => setInFocus(true)}
          >
            <FaMagnifyingGlass />
            <input
              type="text"
              value={prefix}
              placeholder="Search collections and addresses"
              onChange={e => setPrefix(e.target.value)}
              className="bg-black border-none focus:border-none shadow-none focus:outline-none w-full focus:ring-0"
            />
          </div>
          {inFocus ? (
            <div className="absolute w-full">
              <div
                className={clsx(
                  'grid grid-cols-13 w-full p-1 px-2 mt-1 overflow-x-auto overflow-y-hidden bg-neutral-950',
                )}
              >
                {map((chain: ReservoirChain) => (
                  <div
                    className={clsx(
                      'hover:cursor-pointer hover:bg-black flex justify-center items-center p-2 py-4 border-b-2 hover:border-yellow ',
                      includes(chain.id)(selectedChains) ? 'border-yellow bg-black' : 'border-b-neutral-950',
                    )}
                    onClick={() => updateChainSelection(chain.id)}
                  >
                    <div className="w-6 h-6 flex justify-center">
                      <img src={`/assets${chain.darkIconUrl}`} />
                    </div>
                  </div>
                ))(filterOutChains([Network.BASE_SEPOLIA, Network.SEPOLIA])(supportedChains))}
              </div>
            </div>
          ) : null}
        </div>
        {inFocus && data ? (
          <div className="absolute w-full mt-[4.5rem]">
            <div>
              {status === QueryStatus.pending && (
                <>
                  <div>
                    <SkeletonLoader height="h-8" />
                  </div>
                  <div>
                    <SkeletonLoader height="h-8" />
                  </div>
                  <div>
                    <SkeletonLoader height="h-8" />
                  </div>
                </>
              )}
              {status === QueryStatus.fulfilled && (
                <div>
                  {map((collection: SearchResult) => (
                    <Link href={`/${findChainNameByChainId(collection.chainId)}/${collection.id}`}>
                      <div className="p-1 bg-neutral-950 my-1 flex flex-row justify-between items-start text-yellow hover:bg-neutral-900 hover:border-yellow border-b-2 border-neutral-950 transition-colors ">
                        <div className="flex flex-row w-full">
                          <div className="w-16 h-16 mr-3">
                            {collection.image ? <img src={collection.image} alt={collection.name} /> : null}
                          </div>
                          <div className="w-full">
                            <div className="flex flex-row justify-between">
                              <div className="flex flex-col items-start">
                                <div className="font-bold text-lg mr-2 flex flex-row">
                                  {collection.name}
                                  <div className="w-3 h-3 mt-1 ml-1.5">
                                    <img
                                      src={`/assets${findChainIconByChainId(collection.chainId)}`}
                                      alt={findChainNameByChainId(collection.chainId)}
                                    />
                                  </div>
                                </div>

                                <div className="text-xs font-bold text-slate-500 flex flex-row items-center">
                                  {collection.openseaVerificationStatus === 'verified' ? (
                                    <img src={`/assets/icons/opensea-verified.svg`} alt="OpenSea verified" />
                                  ) : null}
                                  {collection.tokenCount} items
                                </div>
                              </div>
                              <div className="flex flex-row">
                                <div className="text-lg mr-4 font-bold mt-2 leading-tight text-slate-500">
                                  <h6 className="font-bold text-xs uppercase">Floor</h6>
                                  {formatAmount(collection.floorAskPrice)}
                                </div>
                                <div className="text-lg mr-4 font-bold mt-2 leading-tight text-slate-500">
                                  <h6 className="font-bold text-xs uppercase">All time volume</h6>
                                  {formatNumber(collection.allTimeVolume)}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))(data.collections)}
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </>
  )
}
