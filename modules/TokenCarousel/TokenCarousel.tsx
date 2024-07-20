import React, { FC, useRef } from 'react'
import Slider from 'react-slick'

import { NFT } from '../../common/types'
import { map } from 'ramda'
import { TokenCard } from '../TokenCard'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6'

interface TokenCarouselProps {
  nfts: NFT[]
  network: string
}

export const TokenCarousel: FC<TokenCarouselProps> = ({ nfts, network }) => {
  const sliderRef = useRef(null)
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    swipeToSlide: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
  }

  return (
    <div className="mb-5">
      <Slider {...settings} ref={sliderRef}>
        {map((nft: NFT) => (
          <div key={nft.token.tokenId} className="p-3">
            <TokenCard token={nft} network={network} />
          </div>
        ))(nfts)}
      </Slider>
      <div className="flex flex-row justify-end mr-3">
        <button
          className="p-3 border-2 border-black border-r transition-all hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          onClick={() => sliderRef?.current?.slickPrev()}
        >
          <FaArrowLeft />
        </button>
        <button
          className="p-3 border-2 border-black border-l transition-all hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          onClick={() => sliderRef?.current?.slickNext()}
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  )
}
