import Image from 'next/image'
import React, { FC } from 'react'

export enum Size {
  s,
  m,
  l,
}

interface LoaderProps {
  size?: Size
  color?: 'black' | 'white'
}

export const Loader: FC<LoaderProps> = ({ size = Size.m, color = 'black' }) => {
  const SIZE_MAP = {
    [Size.s]: 15,
    [Size.m]: 30,
    [Size.l]: 45,
  }
  return color === 'black' ? (
    <Image src="/assets/images/loader.svg" height={SIZE_MAP[size]} width={SIZE_MAP[size]} alt="One moment" />
  ) : (
    <Image src="/assets/images/loader-white.svg" height={SIZE_MAP[size]} width={SIZE_MAP[size]} alt="One moment" />
  )
}
