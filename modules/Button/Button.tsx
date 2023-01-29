import { match } from 'ts-pattern'
import React, { FC } from 'react'
import { Loader } from '../Loader'

interface ButtonProps {
  label: string
  onClick: Function
  type?: 'solid' | 'ghost'
  loading?: boolean
}

export const Button: FC<ButtonProps> = ({ label, onClick, type = 'solid', loading }) => {
  const solid = (
    <a
      href=""
      title={label}
      className={`text-2xl active:translate-x-1 active:translate-y-1 font-semibold tracking-tight text-center border-2 border-yellow shadow-[5px_5px_0px_0px_rgba(255,255,255,1)] active:shadow-[0px_0px_0px_0px_rgba(255,255,255,1)] group h-[52px] overflow-clip whitespace-nowrap`}
      role="button"
      onClick={e => onClick(e)}
    >
      <div className="text-yellow bg-black">
        <div className={`px-4 py-2 flex flex-row justify-center ${loading ? 'text-black' : ''}`}>{label}</div>
        <div className={`px-4 py-2 flex-row justify-center -translate-y-full ${loading ? 'flex' : 'hidden'}`}><Loader color='white'/></div>
      </div>
      <div className="text-black bg-yellow -translate-y-full w-0 group-hover:w-full transition-width overflow-x-hidden">
        <div className="px-4 py-2 flex flex-row justify-center">{label}</div>
      </div>
    </a>
  )

  const ghost = (
    <a
      href="#"
      title={label}
      className="text-lg active:translate-x-1 active:translate-y-1 text-black bg-white border-2 border-black text-center shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] active:shadow-[0px_0px_0px_0px_rgba(255,255,255,1)] hover:border-red hover:-translate-x-2 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_rgba(127,29,29,1)] transition-all group overflow-clip whitespace-nowrap h-[64px]"
      role="button"
      onClick={e => onClick(e)}
    >
      <div className="text-black bg-white h-[64px] flex items-center">
        <div className="px-4 py-2">{label}</div>
      </div>
      <div className="text-white bg-red -translate-y-full w-0 group-hover:w-full transition-width overflow-x-hidden h-[64px] flex items-center">
        <div className="px-4 py-2">{label}</div>
      </div>
    </a>
  )

  return match(type)
    .with('solid', () => solid)
    .with('ghost', () => ghost)
    .exhaustive()
}
