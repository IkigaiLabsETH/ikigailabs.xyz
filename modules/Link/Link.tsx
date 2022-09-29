import React, { FC, ReactNode } from 'react'

interface LinkProps {
  children: ReactNode
  href: string
  title: string
}

export const Link: FC<LinkProps> = ({ children, href, title }) => (
  <a
    href={href}
    title={title}
    className="font-bold tracking-tighter border-2 border-red shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] group h-[44px]"
  >
    <div className="text-red bg-black h-[40px] whitespace-nowrap">
      <div className="px-4 py-2">{children}</div>
    </div>
    <div className="text-black bg-red -translate-y-full w-0 group-hover:w-full transition-width overflow-hidden h-[40px] whitespace-nowrap">
      <div className="px-4 py-2">{children}</div>
    </div>
  </a>
)
