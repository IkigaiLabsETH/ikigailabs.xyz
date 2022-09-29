import { map, prop } from 'ramda'
import React, { FC, MouseEvent, useEffect } from 'react'
import { useAddress } from '@thirdweb-dev/react'
import { match } from 'ts-pattern'

import { useAppDispatch, useAppSelector } from '../../common/redux/store'
import {
  fetchSignatureDropOwnedTokenIds,
  selectClaimedSupply,
  selectClaimedSupplyLoadingState,
  selectMetadata,
  selectMetadataLoadingState,
  selectNfts,
  selectNftsLoadingState,
  selectOwnedTokenIdsLoadingState,
  selectOwnedTokensAmount,
  selectTotalSupply,
  selectUnclaimedSupply,
  selectUnclaimedSupplyLoadingState,
  fetchSignatureDrop,
  claimNFT,
  selectNftClaimConditions,
  selectNftClaimConditionsLoadingState,
  selectClaimNFTLoadingState,
} from './SignatureDrop.slice'
import { ClaimCondition, ContractMetadata, NFTMetadata, NFTMetadataOwner, Status } from '../../common/types'
import { Loader } from '../Loader'
import { Eyebrow } from '../Eyebrow'
import { Link } from '../Link'
import { Button } from '../Button'

interface SignatureDropProps {
  contract: string
}

export const SignatureDrop: FC<SignatureDropProps> = ({ contract }) => {
  const dispatch = useAppDispatch()
  const address = useAddress()

  const nfts = useAppSelector(selectNfts) as NFTMetadataOwner[]
  const nftsLoadingState = useAppSelector(selectNftsLoadingState)

  const dropMetadata = useAppSelector(selectMetadata) as ContractMetadata
  const dropMetadataLoadingState = useAppSelector(selectMetadataLoadingState)

  const claimedSupply = useAppSelector(selectClaimedSupply) as number
  const claimedSupplyLoadingState = useAppSelector(selectClaimedSupplyLoadingState)

  const unclaimedSupply = useAppSelector(selectUnclaimedSupply) as number
  const unclaimedSupplyLoadingState = useAppSelector(selectUnclaimedSupplyLoadingState)

  const totalSupply = useAppSelector(selectTotalSupply)

  const ownedTokenAmount = useAppSelector(selectOwnedTokensAmount) as number
  const ownedTokenIdsLoadingState = useAppSelector(selectOwnedTokenIdsLoadingState)

  const claimConditions = useAppSelector(selectNftClaimConditions) as ClaimCondition[]
  const claimConditionsLoadingState = useAppSelector(selectNftClaimConditionsLoadingState)

  const claimNFTLoadingState = useAppSelector(selectClaimNFTLoadingState)

  useEffect(() => {
    dispatch(fetchSignatureDrop({ contract }))
  }, [contract])

  useEffect(() => {
    dispatch(fetchSignatureDropOwnedTokenIds({ contract, wallet: address }))
  }, [contract, address])

  const claim = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    dispatch(claimNFT({ contract, quantity: 1, address }))
  }

  const conditions = () =>
    map((claimCondition: ClaimCondition) => (
      <ul className="grid grid-cols-4 gap-4 w-full" key={claimCondition.startTime as unknown as string}>
        <div>
          <h4 className="text-xs uppercase tracking-widest m-0 grey">Max Quantity:</h4>
          <span className="font-bold text-2xl tracking-tight">{claimCondition.maxQuantity}</span>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-widest m-0 grey">Max per transaction:</h4>
          <span className="font-bold text-2xl tracking-tight">{claimCondition.quantityLimitPerTransaction}</span>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-widest m-0 grey">Available Supply:</h4>
          <span className="font-bold text-2xl tracking-tight">{claimCondition.availableSupply}</span>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-widest m-0 grey">Current mint supply:</h4>
          <span className="font-bold text-2xl tracking-tight">{claimCondition.currentMintSupply}</span>
        </div>
      </ul>
    ))(claimConditions)

  const dropMetadataDisplay = () => (
    <>
      <div className="flex relative flex-col lg:flex-row-reverse w-screen lg:h-screen items-center lg:min-h-[55rem]">
        <div
          className="w-full lg:w-1/2 h-96 lg:h-screen lg:min-h-[55rem] bg-no-repeat bg-center bg-cover"
          style={{ backgroundImage: `url(${dropMetadata.image})` }}
        ></div>
        <div className="w-full lg:w-1/2 p-16 max-w-3xl">
          <Eyebrow>Signature</Eyebrow>
          <h2 className="text-[4rem] lg:text-[6rem] leading-none font-bold mb-4 tracking-tight boska">
            {dropMetadata.name}
          </h2>
          <p className="my-8 satoshi text-xl leading-relaxed">{dropMetadata.description}</p>
          <div className="flex border-y border-y-gray-700 py-8 mt-6">
            <div className="grid grid-cols-4 gap-4 w-full">
              <div>
                <h4 className="text-xs uppercase tracking-widest m-0 grey">Total Supply:</h4>
                <span className="font-bold text-2xl tracking-tight">{totalSupply}</span>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-widest m-0 grey">Claimed:</h4>
                <span className="font-bold text-2xl tracking-tight">
                  {match(claimedSupplyLoadingState)
                    .with('loading', () => <Loader color="white" />)
                    .with('succeeded', () => claimedSupply)
                    .otherwise(() => (
                      <></>
                    ))}
                </span>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-widest m-0 grey">Unclaimed:</h4>
                <span className="font-bold text-2xl tracking-tight">
                  {match(unclaimedSupplyLoadingState)
                    .with('loading', () => <Loader color="white" />)
                    .with('succeeded', () => unclaimedSupply)
                    .otherwise(() => (
                      <></>
                    ))}
                </span>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-widest m-0 grey grey">Owned:</h4>
                <span className="font-bold text-2xl tracking-tight">
                  {match(ownedTokenIdsLoadingState)
                    .with('loading', () => <Loader color="white" />)
                    .with('succeeded', () => ownedTokenAmount)
                    .with('idle', () => 'Not connected')
                    .otherwise(() => (
                      <></>
                    ))}
                </span>
              </div>
            </div>
          </div>
          <div className="my-8">
            {match(claimConditionsLoadingState)
              .with('loading', () => <Loader color="white" />)
              .with('succeeded', conditions)
              .otherwise(() => (
                <></>
              ))}
          </div>
          <div className="flex">
            {match(claimConditionsLoadingState)
              .with('loading', () => <Loader color="white" />)
              .with('succeeded', () =>
                match(claimNFTLoadingState)
                  .with('loading', () => <Loader color="white" />)
                  .with('succeeded', () => <div>Congrats</div>)
                  .otherwise(() => <Button label={`Buy for ${claimConditions[0].currencyMetadata.displayValue} eth`} onClick={claim} />)
              )
              .otherwise(() => (
                <></>
              ))}
          </div>
        </div>
      </div>
    </>
  )

  const nftsDisplay = () => (
    <div className="bg-white w-full flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-screen-2xl p-8 text-black">
        {map(({ metadata }: NFTMetadataOwner) => (
          <div
            key={metadata.id as unknown as string}
            className="border-2 border-black transition-all hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
          >
            <div className="overflow-clip h-52">
              <img src={metadata.image} alt={metadata.name as string} />
            </div>
            <div className="p-4">
              <h5 className="font-bold text-2xl mb-4">{metadata.name}</h5>
              <p className="text-black line-clamp-5">{metadata.description}</p>
              <div className="flex justify-center items-center">
                <Link href={`/signature/${contract}/${metadata.id}`} title={metadata.name as string}>
                  View &rarr;
                </Link>
              </div>
            </div>
          </div>
        ))(nfts)}
      </div>
    </div>
  )

  return (
    <div className="flex flex-col w-full">
      <div className="flex">
        {match(dropMetadataLoadingState)
          .with('loading', () => (
            <div className="h-screen flex w-screen justify-center items-center">
              <Loader color="white" />
            </div>
          ))
          .with('succeeded', dropMetadataDisplay)
          .otherwise(() => ( 
            <></>
          ))}
      </div>
      <div>
        {match(nftsLoadingState)
          .with('loading', () => <Loader />)
          .with('succeeded', () => nftsDisplay())
          .otherwise(() => (
            <></>
          ))}
      </div>
    </div>
  )
}
