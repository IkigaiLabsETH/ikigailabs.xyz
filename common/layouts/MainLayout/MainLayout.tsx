import React, { FC, ReactNode } from 'react'
import { Header } from '../../../modules/Header'

interface MainLayoutProps {
  children: ReactNode
}

export const MainLayout: FC<MainLayoutProps> = ({ children }) => (
  <>
    <Header />
    <div className="w-full">{children}</div>
  </>
)
