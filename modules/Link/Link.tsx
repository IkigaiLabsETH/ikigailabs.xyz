import React, { FC, ReactNode } from 'react'

interface LinkProps {
  children: ReactNode
  href: string
  title: string
}

export const Link: FC<LinkProps> = ({ children, href, title }) => (
  <a href={href} title={title} className="font-bold tracking-tighter text-black block w-full">
    {children}
  </a>
)
