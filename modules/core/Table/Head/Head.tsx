import React, { FC, ReactNode } from 'react'

interface HeadProps {
  children: ReactNode
}

export const Head: FC<HeadProps> = ({ children }) => <thead>{children}</thead>
