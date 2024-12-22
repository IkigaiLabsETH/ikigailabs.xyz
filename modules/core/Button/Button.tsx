import clsx from 'clsx'
import Link from 'next/link'
import React from 'react'
import { FC } from 'react'
import { Loader, Size } from '../Loader'

interface ButtonProps {
  variant?: 'solid' | 'outline'
  color?: 'yellow' | 'white'
  href?: string
  className?: string
  children: React.ReactNode
  onClick?: (arg: unknown) => void
  loading?: boolean
  target?: '_blank' | '_self'
  disabled?: boolean
}

const baseStyles = {
  solid: 'shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]  hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]',
  outline: 'group inline-flex ring-1 items-center justify-center py-2 px-4 text-sm',
}

const variantStyles = {
  solid: {
    yellow: [
      'text-yellow border-yellow active:text-yellow focus-visible:outline-yellow',
      'bg-yellow',
      'group-hover:text-black',
    ],
    white: ['text-black border-black active:text-yellow bg-yellow', 'bg-black', 'group-hover:text-yellow'],
  },
  outline: {
    slate:
      'ring-slate-200 text-slate-700 hover:text-slate-900 hover:ring-slate-300 active:bg-slate-100 active:text-slate-600 focus-visible:outline-blue-600 focus-visible:ring-slate-300',
    white:
      'ring-slate-700 text-yellow hover:ring-slate-500 active:ring-slate-700 active:text-slate-400 focus-visible:outline-white',
  },
}

export const Button: FC<ButtonProps> = ({
  variant = 'solid',
  color = 'white',
  className,
  href,
  children,
  onClick,
  loading = false,
  target = '_self',
  disabled = false,
  ...props
}) => {
  className = clsx(baseStyles[variant], variantStyles[variant][color][0], className)

  return href ? (
    <Link
      href={href}
      className={`relative inline-flex items-center justify-start p-4 overflow-hidden font-semibold transition-all duration-150 ease-in-out border-2 group ${className}`}
      target={target}
      {...props}
    >
      <span
        className={clsx(
          'absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out group-hover:h-full',
          variantStyles[variant][color][1],
        )}
      ></span>
      <span
        className={clsx(
          'relative w-full text-center transition-colors duration-200 ease-in-out',
          variantStyles[variant][color][2],
        )}
      >
        {children}
      </span>
    </Link>
  ) : (
    <button
      onClick={onClick}
      className={`relative inline-flex items-center justify-center p-4 overflow-hidden font-semibold transition-all duration-150 ease-in-out border-2 group ${className} disabled:cursor-not-allowed`}
      disabled={disabled}
    >
      <span
        className={clsx(
          'absolute bottom-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-purple-600 group-hover:h-full opacity-90',
          variantStyles[variant][color][1],
        )}
      ></span>
      <span
        className={clsx(
          'relative w-full text-center transition-colors duration-200 ease-in-out leading-none pb-1',
          variantStyles[variant][color][2],
        )}
      >
        <span className={clsx('overflow-hidden inline-block translate-y-1 -translate-x-0.5', loading ? 'w-5' : 'w-0')}>
          <Loader size={Size.s} color={color === 'yellow' ? 'white' : 'black'} />
        </span>{' '}
        {children}
      </span>
    </button>
  )
}
