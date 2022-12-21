import React, { FC, ReactNode, MouseEvent } from 'react'
import { match } from 'ts-pattern'
import { useAppDispatch, useAppSelector } from '../../common/redux/store'
import { showAllowlist } from '../Allowlist'
import { showMintPassDetails } from '../MintPasses'
import { hide, selectModal } from './modal.slice'

interface ModalProps {
  modals: { [key: string]: (data: { [key: string]: any }) => ReactNode }
}

export const Modal: FC<ModalProps> = ({ modals }) => {
  const { data, open } = useAppSelector(selectModal)
  const dispatch = useAppDispatch()

  const modal = modals[showAllowlist.type]

  const closeModal = (event: MouseEvent<HTMLDivElement>) => {
    event.currentTarget === event.target && dispatch(hide())
  }

  const modalComponent = (
    <div
      className="w-full h-screen fixed top-0 left-0 z-50 p-20 flex justify-center items-start backdrop-blur overflow-hidden"
      onClick={closeModal}
    >
      <div className="border-2 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
        <div className="bg-white text-black w-full">{modal(data)}</div>
      </div>
      <button
        onClick={() => dispatch(hide())}
        className="text-black text-3xl leading-none ml-3 bg-white border-2 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] h-9 w-9 px-1 pb-1 block border-black"
      >
        &times;
      </button>
    </div>
  )

  return match(open)
    .with(true, () => modalComponent)
    .otherwise(() => null)
}
