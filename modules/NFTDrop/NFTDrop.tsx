import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'

interface NFTDropProps {
  address: string
  metadata: {
    description: string
    image: string
    name: string
  }
}

export const NFTDrop:FC<NFTDropProps> = ({ address, metadata: { name, description, image } }) => {
   return (
    <Link href={`drop/${address}`}>
      <a className='block relative mb-14 group'>
        <div className='ml-16 mr-10 group-hover:-translate-x-3 transition-all'>
          <img src={image} alt={name} className="object-cover object-center w-full h-4/6"/>
        </div>
        <div className='flex justify-end text-xl z-20 group-hover:translate-x-3 transition-all'>
          <div className='w-96 p-6 bg-white -mt-36 border border-black'>
            <h2 className='bg-black py-2 px-4 text-3xl inline-block italic leading-none text-white mb-4 tracking-tight -translate-x-9'>{name}</h2>
            <p className=''>{description}</p>
            <span className='flex justify-end mt-5 text-base italic'>Visit Collection &rarr;</span>
          </div>
        </div>
      </a>
    </Link>
   )
}
