import React, { FC } from 'react'
import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'

import { useAppSelector } from '../../common/redux/store'
import { selectConfetti } from './confetti.slice'
import { CONFETTI_CONFIG } from './config'

export const Confetti: FC = () => {
  const { show } = useAppSelector(selectConfetti)

  const particlesInit = async (main: any) => {
    await loadFull(main)
  }

  return show ? (
    <div className="z-40 relative">
      <Particles id="tsparticles" options={CONFETTI_CONFIG as any} init={particlesInit} />
    </div>
  ) : (
    <></>
  )
}
