import React, { FC } from 'react'

interface ButtonProps {
  label: string
  onClick: Function
}

export const Button: FC<ButtonProps> = ({ label, onClick }) => (
  <a
    href="#"
    title={label}
    className="font-bold uppercase tracking-tighter border-2 border-yellow shadow-[5px_5px_0px_0px_rgba(255,255,255,1)] group h-[44px] overflow-clip whitespace-nowrap"
    role="button"
    onClick={() => onClick()}
  >
    <div className='text-yellow bg-black'>
      <div className='px-4 py-2'>{label}</div>
    </div>
    <div className='text-black bg-yellow -translate-y-full w-0 group-hover:w-full transition-width overflow-x-hidden'>
      <div className='px-4 py-2'>{label}</div>
    </div>
  </a>
)
