import React, { FC } from 'react'
import { Body, Cell, HeaderCell, Row, Table, Head as THead } from '../Table'
import Image from 'next/image'
import { map, times } from 'ramda'
import { Eth } from '../Eth'
import { Percentage } from '../Percentage'
import Link from 'next/link'
import { Collection, Network } from '../../common/types'
import { SkeletonLoader } from '../SkeletonLoader'

interface CollectionsListProps {
  collections: Collection[]
  network: Network
  isLoading: boolean
}

export const CollectionsList: FC<CollectionsListProps> = ({ collections, network, isLoading }) => {
  return (
    <>
      <div className="hidden lg:block">
        <Table>
          <THead>
            <Row>
              <HeaderCell colspan={2}>Collection</HeaderCell>
              <HeaderCell>Volume</HeaderCell>
              <HeaderCell>Floor price</HeaderCell>
              <HeaderCell>Supply</HeaderCell>
              <HeaderCell>
                <span className="sr-only">Actions</span>
              </HeaderCell>
            </Row>
          </THead>
          <Body>
            {map((collection: any) => (
              <Row key={collection?.id}>
                <Cell>
                  {collection?.image ? (
                    <Image
                      src={collection?.image}
                      alt={collection?.name}
                      className="h-12 w-12 rounded-full"
                      width="48"
                      height="48"
                    />
                  ) : null}
                </Cell>
                <Cell>{collection?.name}</Cell>
                <Cell>
                  <span className="font-bold">
                    <Eth amount={collection?.volume['1day']} />
                  </span>{' '}
                  <Percentage amount={collection?.volumeChange['1day']} />
                </Cell>
                <Cell>
                  <span className="font-bold">
                    <Eth amount={collection?.floorSale['1day']} />
                  </span>{' '}
                  <Percentage amount={collection?.floorSaleChange['1day']} />
                </Cell>
                <Cell>{collection?.tokenCount}</Cell>
                <Cell>
                  <Link href={`/${network}/${collection?.id}`} title={collection?.name}>
                    View &rarr;{' '}
                  </Link>
                </Cell>
              </Row>
            ))(collections || [])}
            {isLoading
              ? times((iterator: number) => (
                  <Row key={iterator}>
                    <Cell>
                      <SkeletonLoader style="light" />
                    </Cell>
                    <Cell>
                      <SkeletonLoader style="light" />
                    </Cell>
                    <Cell>
                      <SkeletonLoader style="light" />
                    </Cell>
                    <Cell>
                      <SkeletonLoader style="light" />
                    </Cell>
                    <Cell>
                      <SkeletonLoader style="light" />
                    </Cell>
                    <Cell>
                      <SkeletonLoader style="light" />
                    </Cell>
                  </Row>
                ))(10)
              : null}
          </Body>
        </Table>
      </div>
      <div className="block lg:hidden">
        <div className="grid grid-rows-1 gap-0 mb-6">
          {map((collection: any) => (
            <div className="flex border-b-2 border-b-black flex-row">
              <div className="flex items-center mr-6">
                {collection?.image ? (
                  <Image src={collection?.image} alt={collection?.name} className="h-12 w-12" width="48" height="48" />
                ) : null}
              </div>
              <div className="w-full">
                <Link href={`/${network}/${collection?.id}`} title={collection?.name}>
                  <div className="font-bold text-lg mb-1 pb-1">
                    {collection?.name}{' '}
                    <span className="text-xs font-normal p-1 bg-gray-100 rounded-lg">{collection?.tokenCount}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 p-2 w-full">
                    <div className="">
                      <span className="font-bold text-xs">
                        <Eth amount={collection?.volume['1day']} />
                      </span>{' '}
                      <span className="text-[10px]">
                        <Percentage amount={collection?.volumeChange['1day']} />
                      </span>
                    </div>
                    <div className="">
                      <span className="font-bold text-xs">
                        <Eth amount={collection?.floorSale['1day']} />
                      </span>{' '}
                      <span className="text-[10px]">
                        <Percentage amount={collection?.floorSaleChange['1day']} />
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          ))(collections || [])}
          {isLoading
            ? times((iterator: number) => (
                <div key={iterator} className="p-1 pb-2">
                  <SkeletonLoader style="light" height="h-16" />
                </div>
              ))(5)
            : null}
        </div>
      </div>
    </>
  )
}
