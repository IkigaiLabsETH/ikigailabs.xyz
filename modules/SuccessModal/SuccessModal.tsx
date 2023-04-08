import React, { FC } from 'react'

interface SuccessModalProps {
  children: React.ReactNode
}

export const SuccessModal: FC<SuccessModalProps> = ({ children }) => {
  return <div className="">{children}</div>
}
