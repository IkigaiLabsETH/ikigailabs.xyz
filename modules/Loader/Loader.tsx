import Image from 'next/image'
import React, { FC } from 'react'
import { match } from 'ts-pattern'

export enum Size {
  s,
  m,
  l,
}

interface LoaderProps {
  size?: Size
  color?: 'black' | 'white' | 'yellow'
}

export const Loader: FC<LoaderProps> = ({ size = Size.m, color = 'black' }) => {
  const SIZE_MAP = {
    [Size.s]: 15,
    [Size.m]: 30,
    [Size.l]: 45,
  }

  return match(color)
    .with('black', () => (
      <Image src="/assets/images/loader.svg" height={SIZE_MAP[size]} width={SIZE_MAP[size]} alt="One moment" />
    ))
    .with('white', () => (
      <Image src="/assets/images/loader-white.svg" height={SIZE_MAP[size]} width={SIZE_MAP[size]} alt="One moment" />
    ))
    .with('yellow', () => (
      <Image src="/assets/images/loader-yellow.svg" height={SIZE_MAP[size]} width={SIZE_MAP[size]} alt="One moment" />
    ))
    .exhaustive()
}
