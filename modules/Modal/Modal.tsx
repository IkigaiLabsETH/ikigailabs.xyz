import React, { FC, ReactNode, MouseEvent, useState, useEffect } from 'react'
import { match } from 'ts-pattern'
import { useAppDispatch, useAppSelector } from '../../common/redux/store'
import { showAllowlist } from '../Allowlist'
import { Button } from '../Button'
import { hide, selectModal } from './modal.slice'

interface ModalProps {
  modals: { [key: string]: (data: { [key: string]: any }) => ReactNode }
}

export const Modal: FC<ModalProps> = ({ modals }) => {
  const { data, open, modal } = useAppSelector(selectModal)
  const dispatch = useAppDispatch()
  const [selectedModal, setSelectedModal] = useState<ReactNode>(null)

  useEffect(() => {
    modal && setSelectedModal(modals[modal](data))

    return () => setSelectedModal(null)
  }, [modal])

  const closeModal = (event: MouseEvent<HTMLDivElement>) => {
    event.currentTarget === event.target && dispatch(hide())
  }

  const modalComponent = (
    <div
      className="w-full h-screen fixed top-0 left-0 z-30 p-20 flex justify-center items-start backdrop-blur overflow-hidden"
      onClick={closeModal}
    >
      <div className="border-2 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] w-full md:w-2/3 lg:w-1/2 bg-white">
        <div className=" text-black w-full">{selectedModal && selectedModal}</div>
      </div>
      <Button onClick={() => dispatch(hide())} className="text-3xl leading-none ml-3 p-1.5">
        &times;
      </Button>
    </div>
  )

  return match(open)
    .with(true, () => modalComponent)
    .otherwise(() => null)
}
